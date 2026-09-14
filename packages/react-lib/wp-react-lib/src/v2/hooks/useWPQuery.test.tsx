// @vitest-environment jsdom
import { describe, expect, it, vi } from 'vitest';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { useWPQuery, type UseWPQueryResult } from './useWPQuery';

function mount(ui: React.ReactElement) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    act(() => {
        root.render(ui);
    });
    return { root, container };
}

function flushPromises() {
    return act(() => new Promise((resolve) => setTimeout(resolve, 0)));
}

describe('useWPQuery', () => {
    it('fetches on mount and resolves into data/loading when there is no initialData', async () => {
        const fetcher = vi.fn().mockResolvedValue({ data: ['a'], meta: {} });
        let captured: UseWPQueryResult<string[]> | undefined;

        function Consumer() {
            captured = useWPQuery(fetcher, 'key-1');
            return null;
        }

        mount(<Consumer />);
        expect(captured?.loading).toBe(true);
        expect(fetcher).toHaveBeenCalledTimes(1);

        await flushPromises();

        expect(captured?.loading).toBe(false);
        expect(captured?.data).toEqual(['a']);
    });

    it('skips the initial fetch when initialData is provided, but still refetches on a depsKey change', async () => {
        const fetcher = vi.fn().mockResolvedValue({ data: ['fetched'], meta: {} });
        let captured: UseWPQueryResult<string[]> | undefined;
        let depsKey = 'key-a';

        function Consumer() {
            captured = useWPQuery(fetcher, depsKey, { data: ['initial'] });
            return null;
        }

        const { root, container } = mount(<Consumer />);
        expect(fetcher).not.toHaveBeenCalled();
        expect(captured?.data).toEqual(['initial']);
        expect(captured?.loading).toBe(false);

        depsKey = 'key-b';
        await act(async () => {
            root.render(<Consumer />);
        });
        await flushPromises();

        expect(fetcher).toHaveBeenCalledTimes(1);
        expect(captured?.data).toEqual(['fetched']);

        root.unmount();
        container.remove();
    });

    it('refetch() triggers another fetch even when depsKey is unchanged', async () => {
        const fetcher = vi.fn().mockResolvedValue({ data: ['x'], meta: {} });
        let captured: UseWPQueryResult<string[]> | undefined;

        function Consumer() {
            captured = useWPQuery(fetcher, 'stable-key');
            return null;
        }

        mount(<Consumer />);
        await flushPromises();
        expect(fetcher).toHaveBeenCalledTimes(1);

        act(() => {
            captured?.refetch();
        });
        await flushPromises();

        expect(fetcher).toHaveBeenCalledTimes(2);
    });

    it('surfaces a rejected fetch as `error`, not a thrown exception', async () => {
        const failure = new Error('boom');
        const fetcher = vi.fn().mockRejectedValue(failure);
        let captured: UseWPQueryResult<string[]> | undefined;

        function Consumer() {
            captured = useWPQuery(fetcher, 'key-err');
            return null;
        }

        mount(<Consumer />);
        await flushPromises();

        expect(captured?.loading).toBe(false);
        expect(captured?.error).toBe(failure);
        expect(captured?.data).toBeNull();
    });
});
