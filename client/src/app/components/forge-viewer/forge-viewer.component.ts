import { Component, ViewChild, OnDestroy, ElementRef, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy, } from '@angular/core';
import { ForgeService } from './../../services/forge.service'

import { Project } from '../../models/project';

declare const Autodesk: any;

@Component({
  selector: 'app-forge-viewer',
  templateUrl: './forge-viewer.component.html',
  styleUrls: ['./forge-viewer.component.css']
})

export class ForgeViewerComponent implements OnInit, OnDestroy, OnChanges {
  
  @Input() project: Project;
  @Input() objectsIds: Project;
  @Output() selectedObjects = new EventEmitter();
  @ViewChild('viewerContainer') viewerContainer: any;
  
  
  private viewer: any
  private selectedSection: any = null;

  constructor(private elementRef: ElementRef,
              private forgeService: ForgeService,) { }

  ngOnInit() {


  }

  ngAfterViewInit() {
    console.log("ngafterinit");

    this.launchViewer();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes:", changes);
    if (changes['objectsIds'].currentValue) {
      let varChange = changes['objectsIds'];
      var objectsIds = varChange.currentValue;
      if (objectsIds) {
        console.log("chamou isolou");

        this.isolateObject(objectsIds);
      }
    }
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
        this.createUI();

      });
    }
  }

  private loadDocument() {
    console.log("load document");

    // const urn = 'urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6aXNpYTU4NDc4MzI4NDA0YTg4MWQ5ZDMzMzIyMmU5ZjI1NzgvYXBhcnRhbWVudG8ucnZ0';
    const urn = 'urn:' + this.project.objectKey;

    Autodesk.Viewing.Document.load(urn, (doc) => {
      const geometryItems = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), { type: 'geometry' }, true);

      if (geometryItems.length === 0) {
        return;
      }

      this.viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, this.geometryLoaded);
      this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, (event) => this.selectionChanged(event));      

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
  }

  private onToolBarCreatedBinded(event: any) {
    console.log("onToolBarCreatedBinded");
  }

  private createUI = function () {
    var _this = this;

    // prepare to execute the button action
    var handleSelectionToolbarButton = new Autodesk.Viewing.UI.Button('handleSelectionButton');
    handleSelectionToolbarButton.onClick = function (e) {

      /// get current selection
      var selection = _this.viewer.getSelection();
      console.log("selection", selection);
      _this.viewer.clearSelection();
      // anything selected?
      if (selection.length > 0) {
        // create an array to store dbIds to isolate
        var dbIdsToChange = [];
        var propObjects = []

        for(var i = 0, len = selection.length; i < len; i++) {
          propObjects.push(_this.getProps(_this, selection[i], propObjects));
        }

        Promise.all(propObjects).then(data => {
          _this.selectedObjects.emit(data); 
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


  getProps(_this, dbId, propObjects) {
    return new Promise((resolve, reject )=> {
      _this.viewer.getProperties(dbId, function (props) {
        // output on console, for fun...
        console.log("colocou no propObjects e isolou:",props, dbId);
        
        _this.viewer.isolate(dbId);

        let obj = {
          dbId: props.dbId,
          name: props.name,
          externalId: props.externalId
        }

        resolve(obj);
       
      })
    })   
  }

  isolateObject(dbIds) {
    console.log("isolou", dbIds);
    this.viewer.isolate(dbIds);
  }
}