Feature: validating login page

  @API @GetProject
  Scenario: Retrieving the project details
    Given GET request is available for Retrieving the user details
    When user send 2 as user id
    Then user sees 200 response
    And response related to user should have id as 2
