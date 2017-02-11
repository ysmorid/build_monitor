$(function() {
  var updateStatus, retrieveStatus;

  updateStatus = function(selector, build) {
    if (!build) {
      $(selector).hide();
      return;
    }

    $(selector + " h1").text(build.name);
    $(selector + " h2").text(build.label ? build.label : "");
    //$(selector + " h3").text(build.time);

    $(selector).children('div')[0].className = ('border ' + build.activity);

    if (build.status == "success") {
      $(selector).addClass("passed");
      $(selector).removeClass("failure");
      $(selector).removeClass("error");
    } else if (build.status == "failure") {
      $(selector).addClass("failure");
      $(selector).removeClass("passed");
      $(selector).removeClass("error");
    } else {
      $(selector).addClass("error");
      $(selector).removeClass("passed");
      $(selector).removeClass("failure")
    }

    $(selector).click(function () {
        window.location.reload();
        location.href = build.url;
    });

    $(selector).show();
  };

  retrieveStatus = function() {
    var jsonFile = window.location.hash.substring(1);
    $("#title").text(jsonFile);
    $.ajax({
      url: "data/"+jsonFile+".json",
      success: function(data) {
        insertHTML('stages', create_stages(data.length));

        for (var i = 0; i < data.length; i++) {
          updateStatus(('#build' + (i+1)), data[i]);
        } 
      },
    });
    setTimeout(retrieveStatus, 2000);
  }

  retrieveStatus();
})

function update_statuses(data) {
  
}

function create_stages(num_stages) {
    var html = '';
    
    for (stage = 1; stage <= num_stages; stage++) {
      html += '<div id="build' + stage + '" class="light passed">';
      html += '<div>';
      html += '<h2 id="label">label</h2>';
      html += '<div class="base">';
      html += '<div class="center">';
      html += '<h1></h1>';
      //html += '<h3></h3>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
    }
    
    return html;
}
        
function insertHTML(id, html) {
    var el = document.getElementById(id);
    
    if(!el) {
        alert('Element with id ' + id + ' not found.');
    }
    
    el.innerHTML = html;
}
