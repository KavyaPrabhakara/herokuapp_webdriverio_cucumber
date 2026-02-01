Feature: File Upload

  Scenario: Upload a valid file and validate file name
    Given user is on file upload page
    When user uploads a valid file
    Then uploaded file name should be displayed
