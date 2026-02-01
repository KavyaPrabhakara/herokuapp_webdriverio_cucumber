Feature: Dynamic Content Handling

  Scenario: Verify content visibility after dynamic loading
    Given user is on dynamic loading page
    When user starts loading content
    Then loaded content should be visible
