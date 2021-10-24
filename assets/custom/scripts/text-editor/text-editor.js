/**
 * ---------------------------------------------------------------------------------|
 * * Author: Yashvardhan
 * * Date: 22 Oct 2021
 * * Time: 10:57 PM
 * * Description:
 * * Suffix: TE
 * * Licensed: Private
 * * Version: 0.1v
 * 
 * * This file belongs to Yashvardhan.
 * ---------------------------------------------------------------------------------|
 */
const FILEHEADERTE = "";

//////////////////////////////////////////////////////////////////////////////
// Main Event
/////////////////////////////////////////////////////////////////////////////


document.getElementById("text-editor").addEventListener("click", loadTextEditor);

//////////////////////////////////////////////////////////////////////////////
// Classes
/////////////////////////////////////////////////////////////////////////////

class TabTE {

    #tabID = "";
    #tabName = "";
    #tabContent = "";
    #isTabActive = false;

    constructor(tabID, tabName, tabContent, isTabActive = true) {
        this.#tabID = tabID;
        this.#tabName = tabName;
        this.#tabContent = tabContent;
        this.#isTabActive = isTabActive;
    }

    set ID(id) {
        this.#tabID = id;
    }
    get ID() {
        return this.#tabID;
    }

    set name(n) {
        this.#tabName = n;
    }
    get name() {
        return this.#tabName;
    }

    set content(c) {
        this.#tabContent = c;
    }
    get content() {
        return this.#tabContent;
    }

    set tabActive(isActive) {
        this.#isTabActive = isActive;
    }

    get tabActive() {
        return this.#isTabActive;
    }
}

class TextEditorTE {

    // Private Members
    #tabs = []

    #TabIDs = []

    // Public Members

    isLoaded = false;

    // Private Methods
    #addID() {

        let c = "text-editor-tab-" + Math.round(Math.random() * 999);

        while(true) {

            if (this.#TabIDs.indexOf(c) === -1) {
                this.#TabIDs.push(c);
                break;
            }
            else {
                c = "text-editor-tab-" + Math.round(Math.random() * 999);
            }
        }

        return c;
    }

    #removeID(id) {
        this.#TabIDs = this.#TabIDs.filter( x => x !== id );
    }

    // Public Methods
    /**
     *
     * @param fileName {string}
     * @param fileContent {string}
     */
    addTab(fileName = "", fileContent = "") {

        let fileID = this.#addID();
        fileName = fileName || "untitled" + fileID.split("-")[3] + ".txt";
        fileContent = fileContent || "Type Something . . .";

        // Deactivating all tabs
        this.#tabs.forEach(x => x.tabActive = false);

        // Adding new tab
        this.#tabs.push(new TabTE(fileID, fileName, fileContent));
    }

    removeTab(id) {

        // remove the id
        this.#removeID(id)
        // remove the tab with specified id
        this.#tabs = this.tabs.filter( x => x.ID !== id );
        // Setting up the last tab active
        if (this.tabs.length > 0) {
            this.tabs.forEach(x => x.tabActive = false);
            this.#tabs[this.tabs.length - 1].tabActive = true;
        }
    }

    removeTabAll() {
        this.#tabs = []
        this.#TabIDs = []
    }

    get tabs() {
        return this.#tabs;
    }
}

const textEditor = new TextEditorTE();

//////////////////////////////////////////////////////////////////////////////
// Loaders
/////////////////////////////////////////////////////////////////////////////


function loadTextEditor() {
    
    // If textEditor is not loaded then load it
    if (!textEditor.isLoaded) {
        drawTextEditorGUI();
        textEditor.isLoaded = true;
    }
    else { // If already loaded then show Already Opened
        alert("Already opened!");
    }
}

//////////////////////////////////////////////////////////////////////////////
// Tabs
/////////////////////////////////////////////////////////////////////////////

/**
 * Add Tab
 */
function addTabTE() {
    textEditor.addTab()
    drawMainUI();
}

/**
 * Remove Tab
 */
function removeTabTE() {
    textEditor.removeTab(jQuery(jQuery(this).parent()).attr('id'));
    jQuery(this).closest(jQuery(this).parent()).remove();
    drawMainUI();
}


//////////////////////////////////////////////////////////////////////////////
// GUI
/////////////////////////////////////////////////////////////////////////////

function drawMainUI() {
    let template = `<div class="col-12 py-5 text-center font-weight-bolder" style="height: 20em;">Nothing to show</div>`;

    // Draw All Tabs
    drawTabGUI(textEditor.tabs);

    // Draw Tab Content
    if (textEditor.tabs.length === 0) {
        jQuery('div#text-editor-tabs-content').html(template);
    }
    else {
        drawTabContentGUI(textEditor.tabs.filter(x => x.tabActive === true)[0].content);
    }
    handleTab();
}

function drawTextEditorGUI() {

    let template = `<!-- Main Content Container -->
                    <div class="container-fluid">

                        <!-- App Main Header -->
                        <div class="row bg-dark py-2">

                            <!-- About App -->
                            <div class="row col-1 mx-auto p-0">
                                <span class="col-12 btn-outline-secondary text-center font-weight-bolder">
                                    TE <i class="fas fa-book-open"></i>
                                </span>
                            </div>

                            <!-- App Tabs -->
                            <div id="text-editor-tabs-name" class="row col-10 mx-auto p-0">
                                <span id="text-editor-add-tab" class="col-12 btn-outline-secondary text-center font-weight-bolder">
                                    <i class="fas fa-plus"></i>
                                </span>
                            </div>

                            <!-- App Close Tab -->
                            <div class="row col-1 mx-auto p-0">
                                <span id="text-editor-close" class="col-12 btn-outline-danger text-center font-weight-bolder">
                                    <i class="fas fa-times"></i>
                                </span>
                            </div>

                        </div>

                        <!-- App Sub Header -->
                        <div class="row bg-dark pt-1">

                            <!-- Action Tabs -->
                            <div class="row col-12 mx-auto p-0">
                                <!-- Files Menu -->
                                <span class="col-1 btn-outline-secondary text-center font-weight-bolder">
                                
                                    <div class="btn-group">
                                        <span type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="fas fa-file"></i> Files
                                        </span>
                                        <div class="dropdown-menu bg-dark dropdown-menu-right p-0">
                                        
                                            <!-- Download Sub-Menu -->
                                            <span id="text-editor-download-file" class="btn btn-outline-secondary col-12 font-weight-bold text-white border-0">
                                                Download
                                            </span>
                                            
                                            <!-- New File Sub-Menu -->
                                            <span id="text-editor-new-file" class="btn btn-outline-secondary col-12 font-weight-bold text-white border-0">
                                                New File
                                            </span>
                                            
                                        </div>
                                    </div>
                                    
                                </span>
                                
                                <!-- Edit Menu -->
                                <span class="col-1 btn-outline-secondary text-center font-weight-bolder">
                                    <i class="fas fa-edit"></i> Edit
                                </span>
                                
                                <!-- View Menu -->
                                <span class="col-1 btn-outline-secondary text-center font-weight-bolder">
                                    <i class="fas fa-search"></i> View
                                </span>
                                
                                <!-- Help Menu -->
                                <span class="col-1 btn-outline-secondary text-center font-weight-bolder">
                                    <i class="fas fa-question"></i> Help
                                </span>
                            </div>

                        </div>

                        <!-- App Tabs Content -->
                        <div id="text-editor-tabs-content" class="row bg-light p-0">
                            <div class="col-12 text-center font-weight-bolder" style="height: 20em;">Nothing to show</div>
                        </div>
                    </div>`;

    jQuery('div#app-work-space').html(template);

    handleTextEditor();
    handleTab();
}

/**
 * This function draw
 * @param tabList {array}
 */
function drawTabGUI(tabList = []) {

    let list = [];

    tabList.forEach( e => {
        if (e.tabActive === true) {
            list.push(`<span id="${e.ID}" class="col-auto btn-info font-weight-bolder pr-0">${e.name} <span id="text-editor-close-tab" class="col-12 btn-outline-danger font-weight-bolder px-1"><i class="fas fa-times"></i></span></span>`);
        }
        else {
            list.push(`<span id="${e.ID}" class="col-auto btn-outline-secondary font-weight-bolder pr-0">${e.name} <span id="text-editor-close-tab" class="col-12 btn-outline-danger font-weight-bolder px-1"><i class="fas fa-times"></i></span></span>`);
        }
    } );

    list.push(`<span id="text-editor-add-tab" class="col-${(12 - (tabList.length * 2)) < 2?2:(12 - (tabList.length * 2))} btn-outline-secondary text-center font-weight-bolder p-0">
                   <i class="fas fa-plus"></i>
               </span>`);

    jQuery('div#text-editor-tabs-name').html(list.join(""));
}

/**
 *
 * @param text {string}
 */
function drawTabContentGUI(text = "") {
    let template = `<textarea id="text-editor-text-field" rows="15"></textarea>`;

    jQuery('div#text-editor-tabs-content').html(template);
    jQuery('textarea#text-editor-text-field').val(text);
}

//////////////////////////////////////////////////////////////////////////////
// Handlers
/////////////////////////////////////////////////////////////////////////////

function updateTabContent() {

    textEditor.tabs.filter(x => x.tabActive === true)[0].content = jQuery(this).val();
}

function switchTabContent() {
    textEditor.tabs.filter(x => x.tabActive === true)[0].tabActive = false;
    textEditor.tabs.filter(x => x.ID === jQuery(this).attr('id'))[0].tabActive = true;
    drawMainUI();
}

function downloadCurrentTabContent() {

    if (textEditor.tabs.length > 0) {
        let textFileAsBlob = new Blob([textEditor.tabs.filter(x => x.tabActive === true)[0].content], { type: 'text/plain' });
        let downloadLink = document.createElement("a");
        downloadLink.download = textEditor.tabs.filter(x => x.tabActive === true)[0].name;
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = function (event) {
            document.body.removeChild(event.target)
        };
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }
    else {
        alert("Nothing to download");
    }
}

/**
 * This function handles all the Text Editor
 * events.
 */
function handleTextEditor() {

    // Text Editor Close Handle
    jQuery('span#text-editor-close').off("click").on("click", unloadTextEditor);

    // Download Current Tab Handle
    jQuery('span#text-editor-download-file').off("click").on("click", downloadCurrentTabContent);

    // New File Handle
    jQuery('span#text-editor-new-file').off("click").on("click", addTabTE);
}

/**
 * This function handles all the tab events
 * and then routes them to their appropriate
 * functioning.
 */
function handleTab() {
    
    // Tab Add Handle
    jQuery('div#text-editor-tabs-name span#text-editor-add-tab').off("click").on("click", addTabTE);

    // Tab Close Handle
    jQuery('div#text-editor-tabs-name span#text-editor-close-tab').off("click").on("click", removeTabTE);

    // Tab Switch Handle
    jQuery('div#text-editor-tabs-name span[id^="text-editor-tab-"]').off("click").on("click", switchTabContent);

    // TextArea Update Handle
    jQuery('textarea#text-editor-text-field').off("change").on("change", updateTabContent);
}

//////////////////////////////////////////////////////////////////////////////
// Unloaders
/////////////////////////////////////////////////////////////////////////////

function unloadTextEditor() {

    let template = `<div class="text-center" style="height: 20em;">
                        Selected app will open here.
                    </div>`;
    textEditor.removeTabAll();
    jQuery('div#app-work-space').html(template);
    textEditor.isLoaded = false;
}