$(function() {
  var updateStatus, retrieveStatus;

  updateStatus = function(selector, build) {
    if (!build) {
      $(selector).hide();
      return;
    }

    $(selector + " h1").text(build.name);
    $(selector + " h2").text(build.label ? build.label : "");

    $(selector).children('div')[0].className = ('border ' + build.activity);

    if (build.status == "success") {
      $(selector).addClass("passed");
      $(selector).removeClass("failed");
    } else {
      $(selector).addClass("failed");
      $(selector).removeClass("passed");
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
        updateStatus('#build1', data[0]);
        updateStatus('#build2', data[1]);
        updateStatus('#build3', data[2]);
        updateStatus('#build4', data[3]);
        updateStatus('#build5', data[4]);
        updateStatus('#build6', data[5]);
        updateStatus('#build7', data[6]);
        updateStatus('#build8', data[7]);
        updateStatus('#build9', data[8]);
      },
    });
    setTimeout(retrieveStatus, 5000);
  }

  retrieveStatus();
})

function create_stages(num_stages) {
    var html = '';
    
    for (stage = 1; stage <= num_stages; stage++) {
      html += '<div id="build' + stage + '" class="light passed" style="display: none">';
      html += '<div>';
      html += '<h2 id="label">label</h2>';
      html += '<div class="base">';
      html += '<div class="center">';
      html += '<h1></h1>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
      html += '</div>';
    }
    
    return html;
}
        
window.onload = run();

function insertHTML(id, html) {
    var el = document.getElementById(id);
    
    if(!el) {
        alert('Element with id ' + id + ' not found.');
    }
    
    el.innerHTML = html;
}

function run() {
    insertHTML('stages', create_stages(9));
}