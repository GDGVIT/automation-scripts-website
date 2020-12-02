/*URL for all scripts display*/
let URL = `https://automation-script-worker.herokuapp.com/scripts/?limit=10&offset=0`;
/*Global variable to mark search on or off and trigger general display accordingly*/
let search = false;
let verified = `<i class="fas fa-check-circle"></i>`
let notVerified = '',
    verifiedHtml;
let errorMessage = `<h2 class="err-msg">No results found :/</h3>`


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
    if (data.count == 0) {
        $('#error').removeClass('hide')
    } else {
        $('#error').addClass('hide')
        for (let i = 0; i < data.results.length; i++) {
            let current = data.results[i];
            /*Call extract date function to get date from timestamp*/
            let date = extractDate(current.added);
            if (current.verified)
                verifiedHtml = verified;
            else
                verifiedHtml = notVerified;
            const card = `<div class="card" loading="lazy">
            <div class="card-main">
                <img src="${current.creator_dp}" alt="" class="circular" loading="lazy">
                <div class="card-main-text">
                    <div class="script-name">
                        <h2>${current.name}</h2>
                        ${verifiedHtml}
                        
                    </div>
        
                    <h3> ${current.made_by}</h3>
                    <span class="card-m-b">
                        <p>${date}</p>
                        <span class="btns">
                            <a href="https://automation-script-worker.herokuapp.com/scripts/download/${current.id}" class="card-btn" target="_blank">Download</a>
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
        </div> 
            `
            /*Append card to container */
            $('.container').append(card);


        }

    }


    $('.loader').addClass('hide')

    /*Check if chevron is clicked and collapse/ expand card */
    $(`.fa-chevron-down`).click(function () {
        let store = $(this).closest('.card').html();
        store = `<div class="card">${store}</div>`
        $('#modal').removeClass('hide')
        $('.modal-container').empty()

        $('.modal-container').append(store);
        $('.modal-container > .card > .card-collapsible').removeClass('hide')
        $('.modal-container > .card > .chevron-c').addClass('hide')
        $('.modal-container > .card > .chevron-c-up').removeClass('hide')
    })




}

/*close modal on click of close button*/
$('.close').click(function () {
    $('#modal').addClass('hide');
})


/*Close modal on clicking outside */
$('.modal').click(function (e) {
    
    if($(e.target).hasClass('card-btn')){
        console.log('clicked the link btns')
    }
    else{
        $('#modal').addClass('hide');
    }
})

$('.modal-container ').click(function (e) {
    
    if($(e.target).hasClass('card-btn')){
        console.log('clicked the link btns')
    }
    else{
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
    }
   
})


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
function formsDisplay(){
    if($(window).width()<=768){
        $('#form1').css('display', 'none')
        $('#form2').css('display', 'flex')
    }
    else{
        $('#form2').css('display', 'none')
        $('#form1').css('display', 'flex')
    }
}
$( window ).resize(formsDisplay);
$(  document ).ready(formsDisplay)

/*Search functionality*/
$('.submit-btn').click(function (e) {
    /*Make sure home is visible and contribute is hidden*/
    $('#contribute').addClass('hide');
    $('#home').removeClass('hide');
    let searchInput = $(e.target).siblings('.search');
    let params = $(searchInput).val()
    $('.container').empty();
    let url = `https://automation-script-worker.herokuapp.com/scripts/search/?search=${params}`;
    $('.loader').removeClass('hide')
    jQuery.get(url, function (data, status) {
        addDataToDOM(data);

    })

});

/* Toggle between navlinks*/
$('.nav-link').click(function (e) {
    let clickedId = $(e.target).attr('href').slice(1, );
    $('section').addClass('hide');
    $(`#${clickedId}`).removeClass('hide')

    /*If on contribute change button to home*/

    if (clickedId == 'contribute') {
        $('#grey-btn').attr('href', '#home')
        $('#grey-btn').html('Home')
        
            $('#form1').css('display', 'none')
            $('#form2').css('display', 'none')        
    }
    /*If on home change button to contribute*/
    else {
        $('#grey-btn').attr('href', '#contribute')
        $('#grey-btn').html('Add a script')
        formsDisplay();

    }



})

/*Trigger search button click on pressing enter key*/
var input = document.getElementById("myInput");
$('.search').keydown(function (e) {

    if (e.keyCode == 13) {
        e.preventDefault();
        $(".submit-btn").click();
    }

})






/*Contribute form submit*/


$('#contribute-form').submit(function (e) {
    e.preventDefault()
    let rawLog
    let obj = {
        "name": $('#title').val(),
        "made_by": $('#name').val(),
        "creator_dp": $('#profile').val(),
        "url": $('#url').val(),
        "category": $('#category').val(),
        "type_of_script": $('#type').val(),
        "description": $('#description').val()
    }
    console.log(obj)
    $.ajax({
        type: 'POST',
        url: "https://automation-script-worker.herokuapp.com/scripts/add/",
        data: JSON.stringify(obj),
        error: function (e) {
            console.log(e);
        },

        success: function (data, textStatus, xhr) {
            console.log(xhr.status);
            if (xhr.status == 201) {
                $('#grey-btn').click()
            }
        },
        dataType: "json",
        contentType: "application/json"
    });

})