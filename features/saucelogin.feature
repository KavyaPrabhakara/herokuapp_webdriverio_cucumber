Feature: SauceDemo Form Authentication

  Background:
    Given user is on SauceDemo login page

  Scenario Outline: Login validation
    When user logs in with "<username>" and "<password>"
    Then "<result>" message should be displayed

  Scenario: Logout from application
    When user logs in with "standard_user" and "secret_sauce"
    And user logs out
    Then user should be redirected to login page
