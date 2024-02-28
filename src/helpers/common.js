export function DataURIToBlob(dataURI) {
    var splitDataURI = dataURI.split(",");
    var byteString = splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    var mimeString = splitDataURI[0].split(":")[1].split(";")[0];
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i);
    return new Blob([ia], { type: mimeString });
}
//# sourceMappingURL=common.js.map