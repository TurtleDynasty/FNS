/*******************************************************************************
| Title: API_README
| Purpose: To list and describe API methods
| Last Updated: 2/15/2017
| Updated By: JT Barrett
| Update Reason: Created
\******************************************************************************/


/||**********
||| Dashboard
\||*********/

clear_vis()
-----------
Clears the current content out of the visualization widget


init_sunburst()
---------------
Uses D3.js to construct a sunburst visual that shows the distributions of where data is backed up.
This visual was our first, uses static data, and is more of an experiment.


init_spinner()
--------------
Places a loading spinner into the visualization widget and changes the title accordingly.


clear_messages()
----------------
Removes all the messages in the messages box.


add_message(type, text)
-------------
Adds a single message to the end of the messages box.

type: A string. Either "Warning", or "Suggestion"
text: The message text to be displayed
