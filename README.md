## Runsteps
Npm Install
add a valid Email and Password to Config.json
Npx Playwright test

## Manual Test of the Requirments
The application should provide options to choose the duration for interest calculation: Daily, Monthly, and Yearly. - Passed
Users should be able to input the principal amount. - Passed
Users should be able to select the interest rate from a predefined list of rates up to 15%. - Passed (although we dont know what the predefined list is so requirement is unclear)
The application should calculate the correct interest based on the selected duration, principal amount, and interest rate. - Passed
The application should display the calculated interest and the total amount including interest. - Passed
All input fields (principal amount, interest rate, duration and consent) are mandatory. - Failed (Consent isnt mandatory currently)
The application should inform the user if any field is left empty or not selected. - it does when submitted, but doesnt specify which is missing, so its unclear
For simplicity, the calculated interest and total amount should be rounded to two decimal places. - Passed
The application should be responsive and user-friendly. - Passed
Clear error messages should be displayed to guide users in case of missing or incorrect inputs. - Failed ( messages unclear as said above.)

## Automation
### Tests Created
should calculate daily interest correctly
should calculate monthly interest correctly
should calculate yearly interest correctly
should round interest and total amount to two decimal places
should require a principal amount
should prevent submission without consent
Viewpoint Responsive test : should calculate daily interest correctly

### Tests identified but not done
Users should be able to select the interest rate from a predefined list of rates up to 15%. 
- this test wasnt done as it would be better placed on the unit code level for the dropdown
More Viewpoint tests
- i only did one as it felt a waste repeating them all. but this test only really tests that its still useable, not really the responsive ness of the site

## If I had more time
- I would create some custom matchers forthe decimal point test, and possibly the checking interest rate tests, as currently it is not very readable, or just looking for text. 
- im using magic values in my objects for calculation data, should be in consts file, naughty
- im not a fan of how im handleing dialogs generally

## Bonus section
- The requirments are not clear, and should have had some clarity seeked in the planning and refinement stages
- Requirements in the prep email from recruitment are incorrect and say Weekly/monthly/yearly, the site is daily/monthly/yearly
- the page would fail a design check,
    - the buttons are not inline,
    - consent has weird spacing,
    - logo is broken,
    - the dropdown grows both up and down and blocks most of the other elements for automation,
    - the whole site is missing accessability props so its difficult to navigate using optimal locators
    - there is no data test id's which could be useful
    - the buttons for duration look and are styled as buttons, but are discribed as "links" according to accessability
    - the labels dont label the correct things
    - honestly there is more but I decided this was made in haste for the purpose of a tech test and cut it some slack
