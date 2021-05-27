$(function(){
  var adminIDs = ["admin2408", "admin8034", "admin9045"];
  var userIDs = ["voter182", "voter648", "voter937", "voter729", "voter115"];
  var firstRaceResults = [];
  var secondRaceResults = [];
  var thirdRaceResults = [];
  var questionsAnswered = 0;
  var requestResults = false;

  $("#admin-submit-btn").click(function(){
    if(requestResults == false){
      if(adminIDs.indexOf($("#admin-login").val()) != -1){
        removeAdminForm();
        revealUserLogin();
      }
    }
    if(requestResults == true){
      if(adminIDs.indexOf($("#admin-login").val()) != -1){
        requestResults = false;
        removeAdminForm();
        revealResults();
        revealBackButton();
      }
    }
  });

  $("#user-submit-btn").click(function(){
    if(userIDs.indexOf($("#user-login").val()) != -1){
      removeUserForm();
      revealQuestions();
      userIDs.splice(userIDs.indexOf($("#user-login").val()), 1);
    };
  });

  $(".vote-submit").click(function(){
    setTimeout(function(){
      if(questionsAnswered >= 3){
        revealUserLogin();
      }
    }, 500);
  });

  $(".see-results").click(function(){
    if($(".results-background").css("display") == "none"){
      requestResults = true;
      removeUserForm();
      removeQuestion("#Q1");
      removeQuestion("#Q2");
      removeQuestion("#Q3");
      removeAdminForm();
      revealAdminForm();
    }
  });

  $(".back-button").click(function(){
    removeBackButton();
    removeResults();
    revealAdminForm();
  });

  $(".submit-1").click(function(){
    firstRaceResults.push($("#first-race").val());
    removeQuestion("#Q1");
    setTimeout(function(){
      $("#first-race").val("");
    }, 3000);
    questionsAnswered += 1;
  });

  $(".submit-2").click(function(){
    var checks = [];
    if($("#check-1").prop("checked") == true){
      checks.push($("#check-1").val());
    }
    if($("#check-2").prop("checked") == true){
      checks.push($("#check-2").val());
    }
    if($("#check-3").prop("checked") == true){
      checks.push($("#check-3").val());
    }
    if($("#check-4").prop("checked") == true){
      checks.push($("#check-4").val());
    }

    if(checks.length != 2){
      window.alert("Invalid response for question two. Please choose 2 options.");
    }
    else{
      checks.forEach(function(input){
        secondRaceResults.push(input);
      });
      removeQuestion("#Q2");
      setTimeout(function(){
        $("#check-1").prop("checked", false);
        $("#check-2").prop("checked", false);
        $("#check-3").prop("checked", false);
        $("#check-4").prop("checked", false);
      }, 3000);
      questionsAnswered += 1;
    }
  });

  $(".submit-3").click(function(){
    if($("#radio-1").prop("checked") == true){
      thirdRaceResults.push($("#radio-1").val());
      removeQuestion("#Q3");
      setTimeout(function(){
        $("#radio-1").prop("checked", false);
      }, 3000);
      questionsAnswered += 1;
    }
    else if($("#radio-2").prop("checked") == true){
      thirdRaceResults.push($("#radio-2").val());
      removeQuestion("#Q3");
      setTimeout(function(){
        $("#radio-2").prop("checked", false);
      }, 3000);
      questionsAnswered += 1;
    }
    else{
      window.alert("Invalid response for question three. Please select on answer.");
    }
  });

  function getNumber(resultArray, query){
    var result = 0;
    resultArray.forEach(function(element){
      if(element == query){
        result += 1;
      }
    });
    return result;
  }

  function removeAdminForm() {
    // Remove the administrative login forms.
    setTimeout(function(){
      $(".admin-form").animate({marginTop: "-100px", opacity: "0"}, 1000);
    }, 500);
    setTimeout(function(){
      $(".admin-form").css("display", "none");
    }, 1500);
  }

  function removeUserForm() {
    // Remove the user login forms.
    setTimeout(function(){
      $(".user-form").animate({marginTop: "-100px", opacity: "0"}, 1000);
    }, 500);
    setTimeout(function(){
      $(".user-form").css("display", "none");
    }, 1500);
  }

  function removeQuestion(questionID){
    //Remove a question box.
    setTimeout(function(){
      $(questionID).animate({opacity: "0"}, 1000);
    }, 500);
    setTimeout(function(){
      $(questionID).css("display", "none");
    }, 1500);
  }

  function removeResults(){
    setTimeout(function(){
      $(".results-background").animate({opacity: "0"}, 1000);
    }, 1000);
    setTimeout(function(){
      $(".results-background").css("display", "none");
    }, 3000);
  }

  function removeBackButton(){
    setTimeout(function(){
      $(".back-button").animate({opacity: "0"}, 1000);
    }, 1000);
    setTimeout(function(){
      $(".back-button").css("display", "none");
    }, 1500);
  }

  function revealUserLogin(){
      //Reveal the user login form.
      $("#user-login").val("");
      setTimeout(function(){
        $(".user-form").css("display", "block");
        $(".user-form").animate({opacity: "1", marginTop: "0px"}, 1000);
      }, 2000);
    }

    function revealAdminForm(){
        //Reveal the admin login form.
        $("#admin-login").val("");
        setTimeout(function(){
          $(".admin-form").css("display", "block");
          $(".admin-form").animate({opacity: "1", marginTop: "0px"}, 1000);
        }, 2000);
      }

    function revealQuestions(){
      //Reveal all of the question boxes in order.
      questionsAnswered = 0;
      $("#first-race").val("");

      setTimeout(function(){
        $("#Q1").css("display", "block");
        $("#Q1").animate({opacity: ".82"}, 1000);
      }, 2000);
      setTimeout(function(){
        $("#Q2").css("display", "block");
        $("#Q2").animate({opacity: ".82"}, 1000);
      }, 2500);
      setTimeout(function(){
        $("#Q3").css("display", "block");
        $("#Q3").animate({opacity: ".82"}, 1000);
      }, 3000);
    }

    function revealResults(){
      //Reveal all the results boxes and their contents.
      setTimeout(function(){
        $(".results-background").css("display", "block");
        $(".results-background").animate({opacity: "1"}, 1000);
      }, 2000);

      $("#r1-result1").text(getNumber(firstRaceResults, "Bob"));
      $("#r1-result2").text(getNumber(firstRaceResults, "John"));
      $("#r1-result3").text(getNumber(firstRaceResults, "Mark"));
      $("#r1-result4").text(getNumber(firstRaceResults, "Robert"));
      $("#r1-result5").text(getNumber(firstRaceResults, "Pascal"));

      $("#r2-result1").text(getNumber(secondRaceResults, "Mary"));
      $("#r2-result2").text(getNumber(secondRaceResults, "Jane"));
      $("#r2-result3").text(getNumber(secondRaceResults, "Martha"));
      $("#r2-result4").text(getNumber(secondRaceResults, "Rose"));

      $("#r3-result1").text(getNumber(thirdRaceResults, "Yes"));
      $("#r3-result2").text(getNumber(thirdRaceResults, "No"));
    }

    function revealBackButton(){
      $(".back-button").css("display", "inline");
      $(".back-button").animate({opacity: "1"}, 4000);
    }
});
