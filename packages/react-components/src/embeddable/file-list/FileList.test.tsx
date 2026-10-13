// @vitest-environment jsdom
import React from 'react'
import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import FileList from './FileList'
import type { FileListItem } from './FileList'

const files: FileListItem[] = [
  { id: 1, url: 'https://example.com/wp-content/uploads/protocol.pdf', filename: 'protocol.pdf', mimeType: 'application/pdf', sizeBytes: 3_250_000, displayName: 'General protocol' },
  { id: 2, url: 'https://example.com/wp-content/uploads/manual.docx', filename: 'manual.docx', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' },
]

describe('FileList', () => {
  it('renders nothing when there are no files', () => {
    const { container } = render(<FileList files={[]} />)

    expect(container).toBeEmptyDOMElement()
  })

  it('lists the files in the order given, using the display name or else the filename', () => {
    render(<FileList files={files} />)

    const rows = screen.getAllByRole('link').map((a) => a.closest('div.flex.items-center.justify-between')!.textContent)
    expect(rows[0]).toContain('General protocol')
    expect(rows[1]).toContain('manual.docx')
    expect(screen.getByText('General protocol')).toBeInTheDocument()
    expect(screen.queryByText('protocol.pdf')).not.toBeInTheDocument()
  })

  it('links the download button to the file', () => {
    render(<FileList files={files} />)

    expect(screen.getByRole('link', { name: 'Download PDF' })).toHaveAttribute('href', files[0].url)
  })

  it('takes the type from the mime type, falling back to the filename extension', () => {
    render(<FileList files={[files[0], files[1], { id: 3, url: 'https://example.com/a.csv', filename: 'data.csv' }]} />)

    expect(screen.getByText('PDF')).toBeInTheDocument()
    expect(screen.getByText('DOCX')).toBeInTheDocument()
    expect(screen.getByText('CSV')).toBeInTheDocument()
  })

  it('shows the size when it is known and omits it otherwise', () => {
    render(<FileList files={files} />)

    expect(screen.getByText('3.1 MB')).toBeInTheDocument()
    expect(screen.getAllByText(/\b(B|KB|MB|GB)$/)).toHaveLength(1)
  })

  it('renders the heading only when one is given', () => {
    const { rerender } = render(<FileList files={files} />)
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()

    rerender(<FileList files={files} heading="Study documentation" />)
    expect(screen.getByRole('heading', { name: 'Study documentation' })).toBeInTheDocument()
  })

  it('reads URI-encoded JSON from data-files, as the saved block provides it', () => {
    render(<FileList {...{ 'data-files': encodeURIComponent(JSON.stringify(files)), 'data-heading': 'Docs' }} />)

    expect(screen.getByText('General protocol')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Docs' })).toBeInTheDocument()
  })

  it('reads plain JSON from data-files, as the editor preview provides it', () => {
    render(<FileList {...{ 'data-files': JSON.stringify(files) }} />)

    expect(screen.getByText('General protocol')).toBeInTheDocument()
  })

  it.each(['not json', '%E0%A4%A', '{"a":1}', ''])('renders nothing for unparseable data-files %j', (bad) => {
    const { container } = render(<FileList {...{ 'data-files': bad }} />)

    expect(container).toBeEmptyDOMElement()
  })
})
