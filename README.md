# Mifu FE Challenge

We would like you to complete a small UI/Form in NextJS to demonstrate your technical ability. In `./lib/api` you will find a mock API endpoint called `getCampaignForm()`. Please use this to get the data for your page.

## Task

You need to develop the UI of the page found in `./design.pdf`. This page lets users apply to join a marketing campaign through a form. The form is dynamic and fields should be rendered based on the data returned in from the API reponse. You should apply validation the form to make sure the is_required fields are present. Any of the other fields (`default_fields` or `socials`), if their value is present there then they are required. 

You don't need to submit the form to an api but please log to console `FORM SUBMITTED: {values}`

## Libraries

The libraries you have available to use are:
* Tanstack Query (API Management)
* ChakraUI (UI Library)
* React Hook Form (Form Management)

## Images

Any images you will need can be found in `./images`