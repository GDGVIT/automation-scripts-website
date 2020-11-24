/*remove loader*/
$(document).ready(function () {
    $('.loader').addClass('hide')
})



/*URL for all scripts display*/
let URL = `https://automation-script-worker.herokuapp.com/scripts/?limit=10&offset=0`;
/*Global variable to mark search on or off and trigger general display accordingly*/
let search = false;


/*Extract date from timestamp */
const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

function extractDate(d) {
    let day = d.slice(8, 10);
    let month = monthNames[d.slice(5, 7) - 1].slice(0, 3);
    let dateStr = `${month} ${day}`;
    return dateStr;
}
/*Add card with data*/
function addDataToDOM(data) {
    for (let i = 0; i < data.results.length; i++) {
        let current = data.results[i];
        /*Call extract date function to get date from timestamp*/
        let date = extractDate(current.added);
        const card = ` 
        <div class="card" loading="lazy">
        <div class="card-main">
        <img src="${current.creator_dp}" alt="" class="circular">
        <div class="card-main-text">
        <div class="script-name">
        <h2>${current.name}</h2>
        <i class="fas fa-check-circle"></i>
        </div>
            
            <h3> ${current.made_by}</h3>
            <span class="card-m-b">
                <p>${date}</p>
                <span class="btns">
                    <a href="${current.url}" class="card-btn" target="_blank" >Download</a>
                    <a href="${current.url}" class="card-btn" target="_blank">View</a>
                </span>
            </span>
            </div>
            </div>
            <div class="card-collapsible hide">
                <div class="hr"></div>
                <div>
                <table>
                <tr>
                    <th>
                    Category: 
                    </th>
                    <td class="cell">
                        ${current.category}
                    </td>
                </tr>
                <tr>
                    <th>
                        Description: 
                    </th>
                    <td>
                        ${current.description}
                    </td>
                </tr>
            </table>
        </div>    
    </div>
    <div class="chevron-c">
    <i class="fas fa-chevron-down"></i>
    </div>
    
  
</div>`
        /*Append card to container */
        $('.container').append(card);
    }

    /*Check if chevron is clicked and collapse/ expand card */
    $(`.chevron-c>.fa-chevron-down`).click(function () {
        console.log('clicked')
        $('.modal').removeClass('hide')
        $('.modal-container').html($(this).closest("div.card"));
        $('.modal-container > .card > .card-collapsible').removeClass('hide')

    })

}

/*close modal on click of close button*/
$('.close').click(function () {
    $('.modal').addClass('hide');
})

/*Close modal on clicking outside */

/*Function to get all scripts data*/
function getPost() {
    jQuery.get(URL, function (data, status) {
        addDataToDOM(data);
        URL = data.next;
    });
}

/*Scroll to top */

$('.scroll-top').click(function () {
    $(window).scrollTop(0);
})

/*Enable lazy loading library */
$(function () {
    $('.jscroll').jscroll();
});


/*run the function the first time*/
getPost();


/*Check scroll position*/
$(window).scroll(function (event) {
    var scrollTop = $(document).scrollTop();

    /*Hiding and Showing scroll to top button*/
    if (scrollTop > 100) {
        $('.scroll-top').removeClass('hide')

    } else {
        $('.scroll-top').addClass('hide')
    }

    /*If almost scrolled to bottom, fetch data again*/
    let winHeight = $(window).height()
    let docHeight = $(document).height()

    if (scrollTop + winHeight >= docHeight - 100 && !search) {
        getPost()
    }

});

/*Search functionality*/
$('.submit-btn').click(function (e) {
    /*Make sure home is visible and contribute is hidden*/
    $('#contribute').addClass('hide');
    $('#home').removeClass('hide');


    let searchInput = $(e.target).parent().siblings('.search');
    search = true;
    let params = $(searchInput).val()
    $('.container').empty();
    let url = `https://automation-script-worker.herokuapp.com/scripts/search/?search=${params}`;
    jQuery.get(url, function (data, status) {
        addDataToDOM(data);
    })

});

/* Toggle between navlinks*/
$('.nav-link').click(function (e) {
    let clickedId = $(e.target).attr('href').slice(1, );
    $('section').addClass('hide');
    $(`#${clickedId}`).removeClass('hide')
})
/*File upload*/

/*Trigger file input on clicking the fontawesome icon*/
$('.upload').click(function () {
    $('#profile').click()
})
/*Update paragraph tag with file name*/
$('#profile').change(function (e) {
    const name = e.target.files[0].name;
    $('#filename').html(name)
})

/*Trigger search button click on pressing enter key*/
var input = document.getElementById("myInput");
$('.search').keyup(function (e) {
    console.log(e.keyCode);
    if (e.keyCode === 13) {
        // Cancel the default action, if needed
        e.preventDefault();
        // Trigger the button element with a click
        $(".submit-btn").click();
    }

})