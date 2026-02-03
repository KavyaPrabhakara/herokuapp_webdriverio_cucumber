Feature: SauceDemo Login Authentication

  @smoke
  Scenario: Login validation using JSON test data
    Given user is on SauceDemo login page
    When user performs login for all test data
    Then success and error messages should be validated

  @smoke
  Scenario: Logout and verify secure area exit
    Given user is on SauceDemo login page
    When user logs in with valid credentials
    And user logs out
    Then user should be redirected to login page
 

