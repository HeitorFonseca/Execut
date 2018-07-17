import { Component, ViewChild, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ForgeService } from './../../services/forge.service'

declare const Autodesk: any;

@Component({
  selector: 'app-forge-viewer',
  templateUrl: './forge-viewer.component.html',
  styleUrls: ['./forge-viewer.component.css']
})

export class ForgeViewerComponent implements OnInit, OnDestroy {
  private selectedSection: any = null;
  @ViewChild('viewerContainer') viewerContainer: any;
  private viewer: any

  constructor(private elementRef: ElementRef,
              private forgeService: ForgeService,) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log("ngafterinit");

    this.launchViewer();
  }

  ngOnDestroy() {
    if (this.viewer && this.viewer.running) {
      this.viewer.removeEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, this.selectionChanged);
      this.viewer.tearDown();
      this.viewer.finish();
      this.viewer = null;
    }
  }

  private launchViewer() {
    if (this.viewer) {
      return;
    }

    const options = {
      env: 'AutodeskProduction',
      getAccessToken: (onSuccess) => { this.getAccessToken(onSuccess) },
    };

    this.viewer = new Autodesk.Viewing.Private.GuiViewer3D(this.viewerContainer.nativeElement, {}); // Headless viewer
    // Check if the viewer has already been initialised - this isn't the nicest, but we've set the env in our
    // options above so we at least know that it was us who did this!
    if (!Autodesk.Viewing.Private.env) {
      console.log("!autodesk");
      Autodesk.Viewing.Initializer(options, () => {
        console.log("viewer initialize");
        this.viewer.initialize();

        //var viewerApp = new Autodesk.Viewing.ViewingApplication('forgeViewer');
        
        this.loadDocument();
        this.createUI();
      });
    } else {
      console.log("autodesk");

      // We need to give an initialised viewing application a tick to allow the DOM element to be established before we re-draw
      setTimeout(() => {
        console.log("timeouted");
        this.viewer.initialize();
        this.loadDocument();
      });
    }
  }

  private loadDocument() {
    console.log("load document");

    const urn = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6ZXhlY3V0dGVzdC9hcGFydGFtZW50by5ydnQ';

    Autodesk.Viewing.Document.load(urn, (doc) => {
      const geometryItems = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), { type: 'geometry' }, true);

      if (geometryItems.length === 0) {
        return;
      }

      this.viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, this.geometryLoaded);
      this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, (event) => this.selectionChanged(event));
      
      //this.viewer.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, (event) => this.onToolBarCreatedBinded(event));
      

      this.viewer.load(doc.getViewablePath(geometryItems[0]));
      console.log("viewer:", this.viewer)
      
    }, errorMsg => console.error);
  }

  private geometryLoaded(event: any) {
    const viewer = event.target;
    console.log("GEOMETRY LOADED");
    viewer.removeEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, this.geometryLoaded);
    //viewer.setLightPreset(8);
    viewer.fitToView();
    //viewer.setQualityLevel(false, true); // Getting rid of Ambientshadows to false to avoid blackscreen problem in Viewer.
  }

  private selectionChanged(event: any) {
    const model = event.model;
    const dbIds = event.dbIdArray;

    // Get properties of object
    this.viewer.getProperties(dbIds[0], (props) => {
      // Do something with properties
    });
  }

  private getAccessToken(onSuccess: any) {


    console.log("Forge authentication");

    this.forgeService.getAccessToken().subscribe(data => {
      console.log(data);

      onSuccess(data.access_token, data.expires_in);
    });

    // const access_token = 'eyJhbGciOiJIUzI1NiIsImtpZCI6Imp3dF9zeW1tZXRyaWNfa2V5In0.eyJjbGllbnRfaWQiOiJhQXFYZEZLRVFtMjVnVFJRTVZqZGFHeHZZU014dUxsMCIsImV4cCI6MTUzMTE3MjM3OCwic2NvcGUiOlsiZGF0YTpyZWFkIiwiYnVja2V0OmNyZWF0ZSIsImJ1Y2tldDpyZWFkIiwiZGF0YTp3cml0ZSJdLCJhdWQiOiJodHRwczovL2F1dG9kZXNrLmNvbS9hdWQvand0ZXhwNjAiLCJqdGkiOiJUNk93QVJUUmNmZWlqbXlQZVdGZVBSeURUcTZyZ2lZYnZ4dHVURXNJaWlCbkl2V3NQNmpERDdvcFdvelE3cXQ0In0.BXT7q2XHzOANuU2tGFMZGLKq1DugtEzC57frFILp8qo';
    // const expires_in = 3599;

    // onSuccess(access_token, expires_in);
  }

  private onToolBarCreatedBinded(event: any) {
    console.log("onToolBarCreatedBinded");
  }

  private createUI = function () {
    var _this = this;

    // prepare to execute the button action
    var handleSelectionToolbarButton = new Autodesk.Viewing.UI.Button('handleSelectionButton');
    handleSelectionToolbarButton.onClick = function (e) {

      // **********************
      //
      //
      // Execute an action here

      /// get current selection
      var selection = _this.viewer.getSelection();
      console.log("selection", selection);
      _this.viewer.clearSelection();
      // anything selected?
      if (selection.length > 0) {
        // create an array to store dbIds to isolate
        var dbIdsToChange = [];

        // iterate through the list of selected dbIds
        selection.forEach(function (dbId) {
          // get properties of each dbId
          _this.viewer.getProperties(dbId, function (props) {
            // output on console, for fun...
            console.log(props);

            // ask if want to isolate
            if (confirm('Confirm ' + props.name + ' (' + props.externalId + ')?')) {
              dbIdsToChange.push(dbId);

              // at this point we know which elements to isolate
              if (dbIdsToChange.length > 0) {
                // isolate selected (and confirmed) dbIds
                _this.viewer.isolate(dbIdsToChange);
              }
            }
          })
        })

      }
      else {
        // if nothing selected, restore
        _this.viewer.isolate(0);
      }
    };
    // handleSelectionToolbarButton CSS class should be defined on your .css file
    // you may include icons, below is a sample class:
    handleSelectionToolbarButton.addClass('handleSelectionToolbarButton');
    handleSelectionToolbarButton.setToolTip('Handle current selection');

    // SubToolbar
    this.subToolbar = (this.viewer.toolbar.getControl("MyAppToolbar") ?
      this.viewer.toolbar.getControl("MyAppToolbar") :
      new Autodesk.Viewing.UI.ControlGroup('MyAppToolbar'));
    this.subToolbar.addControl(handleSelectionToolbarButton);

    this.viewer.toolbar.addControl(this.subToolbar);
  }
}