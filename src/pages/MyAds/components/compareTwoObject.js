function compareTwoObject(a1, a2) {
    console.log(a1 , a2)
    if (JSON.stringify({...a1 , myAds : true}) !== JSON.stringify({...a2 , myAds : true})) {
      return false;
    }
    if (JSON.stringify(a1.time) !== JSON.stringify(a2.time)) {
      return false;
    }
    if (a1.photos.length !== a2.photos.length) {
      return false;
    }
    for (let i = 0; i < a1.photos.length; i++) {
      if (a1.photos[i].name !== a2.photos[i].name) {
        return false;
      }
    }
    return true;
  }
  export {compareTwoObject}