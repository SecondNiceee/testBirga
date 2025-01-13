const urlToObject= async(url , nam)=> {
    const response = await fetch(url );
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], nam, {type: blob.type});
    return file
  }

async function makeNewFile(folder, photos){
    let files = []
    for (let i = 0; i < photos.length; i++){
        let file = await urlToObject("https://www.connectbirga.ru/" + folder + '/' + photos[i] , photos[i])
        files.push(file)
    }
    return files
}
export default makeNewFile