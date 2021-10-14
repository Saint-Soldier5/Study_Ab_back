//function for submit button
function myFunction() {
    alert("Please Confirm The Information");
  }

//fuction for reset button  
function myReset() {
    
    alert("Reset The Information");
}

//for onfocus form
function mouseDescFocus(desc) {
    if (desc.children.length < 4) return;
    if (desc.children[3].tagName === 'SMALL')
        desc.children[3].style.display = ''
}
 
function mouseDescBlur(desc) {
    if (desc.children.length < 4) return;
    if (desc.children[3].tagName === 'SMALL')
        desc.children[3].style.display = 'none'
}
 
function LoadthePage() {
    let divs = document.getElementsByClassName("form-floating mb-3");
    for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener("focusin", () => mouseDescFocus(divs[i]));
        divs[i].addEventListener("focusout", () => mouseDescBlur(divs[i]));
 
    }
}