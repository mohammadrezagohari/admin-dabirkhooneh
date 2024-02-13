

function FormatDate(stringDate) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  

    return( new Date(stringDate).toLocaleDateString('fa-IR', options))
     
  
    
  
}

export default FormatDate