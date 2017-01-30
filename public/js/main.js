$(function() {
  var updateStatus, retrieveStatus;

  updateStatus = function(selector, build) {
    if (!build) {
      $(selector).hide();
      return;
    }

    $(selector + " h1").text(build.name);
    $(selector + " h2").text(build.label);
    if (build.activity == "building") {
      $(selector).children('div').addClass("building");
      $(selector).children('div').removeClass("sleeping");
    } else {
      $(selector).children('div').addClass("sleeping");
      $(selector).children('div').removeClass("building");
    }

    if (build.status == "success") {
      $(selector).addClass("passed");
      $(selector).removeClass("failed");
    } else {
      $(selector).addClass("failed");
      $(selector).removeClass("passed");
    }

    $(selector).click(function () {
        location.href = build.url;
        console.out(location.href);
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
    setTimeout(retrieveStatus, 2000);
  }

  retrieveStatus();
})
