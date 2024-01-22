"use strict";

// Function to handle user predictions
function submitUserPrediction() {
  const username = $("#usernameInput").val();
  const userPredictions = [];

  // Loop through fixture rows
  $("#fixturesTable tbody tr").each(function () {
    const matchNumber = $(this).find("td:first").text();
    let prediction = $(this).find(".prediction-input").val();
    prediction = prediction ? prediction.toUpperCase() : "";

    userPredictions.push({
      matchNumber: matchNumber,
      prediction: prediction,
    });
  });

  // Add user predictions to the usersPredictionsTable
  const usersPredictionsTable = $("#usersPredictionsTable tbody");
  let rowHtml = "<tr><td class='username-cell'>" + username + "</td>";

  // Add fixture predictions dynamically
  for (let i = 1; i <= 9; i++) {
    const userPrediction = userPredictions.find(
      (prediction) => prediction.matchNumber === i.toString()
    );
    rowHtml +=
      "<td class='predictions-cell'>" +
      getPredictionDisplay(userPrediction?.prediction) +
      "</td>";
  }

  rowHtml += "</tr>";

  // Check if there are existing rows for the same username
  const existingRow = usersPredictionsTable.find(
    "tr:has(td:contains('" + username + "'))"
  );

  if (existingRow.length > 0) {
    // If rows exist, update the predictions for that user
    existingRow.replaceWith(rowHtml);
  } else {
    // If no rows exist, add a new row for the user
    usersPredictionsTable.append(rowHtml);
  }

  // Reset the form after submitting
  resetForm();
}

// Function to reset the form
function resetForm() {
  $("#usernameInput").val("");
  $(".prediction-input").val(""); // Clear prediction inputs
}

// Function to end predictions
function endPrediction() {
  // You can add any logic here to finalize predictions
  alert("Predictions ended. Display final results.");
}

// Function to print predictions
function printPredictions() {
  // Display match details in the print version
  $(".match-details").each(function () {
    var usernameCell = $(this).closest("tr").find(".username-cell");
    var matchDetails = $(this).text();
    $(this).text(matchDetails + " - " + usernameCell.text());
  });

  // Print only the usersPredictionsTable
  var printContents = $("#usersPredictionsTable").prop("outerHTML");
  var originalContents = document.body.innerHTML;
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
}

// Function to get prediction display text
function getPredictionDisplay(prediction) {
  if (prediction === "L") {
    return "(L)";
  } else if (prediction === "V") {
    return "(V)";
  } else if (prediction === "E") {
    return "(E)";
  } else {
    return "Invalid Prediction";
  }
}

// Function to get fixture details based on match number
function getFixtureDetails(matchNumber) {
  // Replace this with your actual fixture details
  var fixturesDetails = {
    1: "Querétaro vs Toluca",
    2: "Mazatlán FC vs Atlético de San Luis",
    3: "Cruz Azul vs Pachuca",
    4: "Guadalajara vs Santos",
    5: "Monterrey vs Puebla",
    6: "Tijuana vs América",
    7: "Pumas UNAM vs FC Juarez",
    8: "Necaxa vs Atlas",
    9: "León vs Tigres UANL",
  };

  return fixturesDetails[matchNumber] || "Unknown Fixture";
}

// Initialize fixtures and headers dynamically
$(document).ready(function () {
  var fixturesTable = $("#fixturesTable");
  var headersRow = fixturesTable.find("thead tr");

  // Add fixture headers dynamically
  fixtures.forEach(function (fixture) {
    headersRow.append(
      "<th>" + fixture.homeTeam + " vs " + fixture.awayTeam + "</th>"
    );

    // Add fixture row dynamically
    fixturesTable
      .find("tbody")
      .append("<tr><td>" + fixture.matchNumber + "</td></tr>");
  });
});
