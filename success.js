"use strict";

var school_map = {
    "sport_and_health" : "School of Sport and Health Science",
    "management" : "School of Management",
    "technology": "School of Technology",
    "education_and_social_policy": "School of Education and Social Policy",
    "art_and_design": "School of Art and Design"
}

function makeKeyAndValueElements(key, value){
    var key_element = $( "<p></p>" ).text(key).wrapInner( "<b></b>" );
    var value_element = $( "<p></p>" ).text(value);
    var container = $( "<div></div>" );
    container.append(key_element);
    container.append(value_element);
    return container;
}

function formatTitle(date, time, school){
    var title_element = $( "#title" );
    var title = title_element.text();
    title += " " + time + " on the " + date + " by the " + school;
    title_element.text(title);

}

$().ready(function() {
    
    var url = window.location.href;
    var url_info = url.split("?")[1]
    
    var form_details = JSON.parse(decodeURIComponent(url_info));

    var date_time_array = form_details.best_time.split("T");
    var date = date_time_array[0];
    var time = date_time_array[1];

    var first_name = makeKeyAndValueElements("First Name: ", form_details.first_name);
    var last_name = makeKeyAndValueElements("Last Name: ", form_details.last_name);
    var phone = makeKeyAndValueElements("Telephone Number: ", form_details.phone);
    var email = makeKeyAndValueElements("Email Address: ", form_details.email);
    var best_time = makeKeyAndValueElements("Best Time For Contact: ", time);
    var best_date = makeKeyAndValueElements("Best Date For Contact: ", date);
    var school = makeKeyAndValueElements("School you will be contacted by: ", school_map[form_details.school]);

    formatTitle(date, time, school_map[form_details.school]);
    $( "#info" ).after(first_name, last_name, phone, email, best_time, best_date, school);


});