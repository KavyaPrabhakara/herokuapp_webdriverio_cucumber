Feature: Dropdown Handling

  Scenario: Select value from dropdown and validate
    Given user is on dropdown page
    When user selects "Option 2" from dropdown
    Then "Option 2" should be selected
    
      