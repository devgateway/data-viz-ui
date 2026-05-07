Target,Package,License,Severity
{{- range . }}
{{- $target := .Target }}
{{- range .Licenses }}
"{{ $target }}","{{ .PkgName }}","{{ .Name }}","{{ .Severity }}"
{{- end }}
{{- end }}

