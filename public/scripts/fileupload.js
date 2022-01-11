FilePond.registerPlugin(
    FilePondPluginFileEncode,
    FilePondPluginImagePreview,
    FilePondPluginImageResize

)
FilePond.setOptions({
    stylePanelAspectRatio: 1,
    imageResizeTargetHeight: 250,
    imageResizeTargetWidth: 250
})
FilePond.parse(document.body)