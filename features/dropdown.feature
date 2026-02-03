Feature: Dropdown Handling

  @regression
  Scenario: Select value from dropdown and validate
    Given user is on dropdown page
    When user selects value from dropdown using test data
    Then selected value should match test data
