import React, { useState, useContext, useEffect } from 'react';
import { Map, MapLayers, MapTileLayer, MapMarkerLayer, MapShapeLayer, MapMarkerLayerTooltip} from "@progress/kendo-react-map";
import shapes from "./us-states.json";
import MLContext from './ML';
import './MyMap.css';
import { Window, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { DateTime } from 'luxon';
import { orderBy } from "@progress/kendo-data-query";

const startCenter = [37.686020, -90.335571];
const tileSubdomains = ["a", "b", "c"];
const tileUrl = (e) =>
  `https://${e.subdomain}.tile.openstreetmap.org/${e.zoom}/${e.x}/${e.y}.png`;
const attribution =
  '&copy; <a href="https://osm.org/copyright">OpenStreetMap contributors</a>';
const markers = [
  {
    latlng: [30.2675, -97.7409],
    name: "Zevo Toys",
  },
  {
    latlng: [30.2707, -97.749],
    name: "Foo Bars",
  },
  {
    latlng: [30.2705, -97.7409],
    name: "Mainway Toys",
  },
  {
    latlng: [30.2686, -97.7494],
    name: "Acme Toys",
  },
];


const initialSort = [
  {
    field: "start",
    dir: "desc",
  },
];

const MyMap = (props) => {

  const mlContext = useContext(MLContext);

  const [selected, setSelected] = useState(null);
  const [shape, setShape] = useState(null);
  const [locations, setLocations] = useState([]);
  const [center, setCenter] = useState(startCenter);
  const [visible, setVisible] = useState(false);
  const [person, setPerson] = useState(null);
  const [sort, setSort] = React.useState(initialSort);
  
  useEffect(() => {
    console.log('mlContext.locations', mlContext.locations);
    let newLocations = {...locations, ...mlContext.locations};
    console.log('newLocations', newLocations);
    setLocations(newLocations);
  }, [mlContext.locations]);

  const shapeStyle = {
    stroke: {
      color: "blue",
      width: 2,
      opacity: 0.2
    },
    fill: {
      color: "blue",
      opacity: 0
    }
  };

  const handleShapeClick = (event) => {
    // console.log('handleShapeClick event', event);
    setSelected(event.shape.dataItem.properties.name);
    console.log(event);
    mlContext.handleGeo(event.shape.dataItem.geometry.coordinates);
  }

  const handleMarkerClick = (event) => {
    console.log(event);
    setVisible(true);
    setPerson(null);
    mlContext.handleDocument(event.marker.dataItem.uri);
  }

  const toggleDialog = () => {
    setVisible(!visible);
 }

 useEffect(() => {
  console.log(mlContext.document);
  if (mlContext.document) {
    setPerson(mlContext.document.person);
  };
}, [mlContext.document]);

  useEffect(() => {
    mlContext.handleFacets();
  }, []);

  const onShapeCreated = (e) => {
    const shape = e.shape;
    const state = e.dataItem.id;
    if (mlContext.facets && state) {
      let val = mlContext.facets.state.facetValues.find(fv => {
        return state === fv.name;
      })
      if (val && val.count) {
        const opacity = (val.count / 40) + 0.05;
        shape.options.set("fill.opacity", opacity);
      }
    }
  };

  const renderMarkerTooltip = (props) => (
    <span>
      {props.dataItem.name}<br/>({props.location.toString()})
    </span>
  );

  const getEvents = (person) => {
    let items = [];
    
    let eventsArr = Array.isArray(person.events.event) ? 
    person.events.event : 
    [person.events.event];

    let activitiesArr = Array.isArray(person.activities.activity) ? 
    person.activities.activity : 
    [person.activities.activity];

    let events = eventsArr.map(ev => {
      return {
        name: ev.place,
        start: DateTime.fromISO(ev.start).toISODate()
      }
    })

    let acts = activitiesArr.map(ac => {
      return {
        name: ac.place,
        start: DateTime.fromISO(ac.ts).toISODate()
      }
    })
      // locations = [...locations, ...addresses]
      // let schoolsArr = Array.isArray(r.extracted.person.schools.school) ? 
      //   r.extracted.person.schools.school : 
      //   [r.extracted.person.schools.school];
      // let schools = schoolsArr.map(s => {
      //   return {
      //     latlng: [s.latitude, s.longitude],
      //     name: s.name.concat(', ', s.country)
      //   }
      // })
      // locations = [...locations, ...schools]
    // });
    return [...events, ...acts];
  }

  const handlePan = (e) => {
    console.log('handlePan', e.center);
    setCenter(e.center);
  };

  const handleZoom = (e) => {
    console.log('handleZoom', e);
    // setCenter(e.center);
  };

  return (
    <div>
      <div>Selected shape: <span id="selected">{selected}</span>
      <button className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base" onClick={toggleDialog}>Open Dialog</button>
      </div>
      <Map center={center} zoom={5}  
        onShapeClick={handleShapeClick} 
        onMarkerClick={handleMarkerClick} 
        onShapeCreated={onShapeCreated}
        onPanEnd={handlePan}
        onZoomEnd={handleZoom}
        zoomable={false}
      >
        <MapLayers>
          <MapTileLayer
            urlTemplate={tileUrl}
            subdomains={tileSubdomains}
            attribution={attribution}
          />
          <MapShapeLayer
            data={shapes}
            style={shapeStyle}
          />
          <MapMarkerLayer
            data={mlContext.locations}
            locationField="latlng"
            titleField="name"
          ><MapMarkerLayerTooltip render={renderMarkerTooltip} /></MapMarkerLayer>
        </MapLayers>
      </Map>
     {visible && <Window 
        title={person && person.nameGroup.fullname.value} 
        onClose={toggleDialog} 
        initialHeight={540}
        initialWidth={440}
        initialTop={20}
        initialLeft={1000}
        maximizeButton={false}
      >
         { person && <div style={{display: "flex", justifyContent: "space-between"}}>
          <div>
            <div>
            {person.addresses.address.street}<br />
            {person.addresses.address.city}, {person.addresses.address.state} {person.addresses.address.postal}
            </div>
            <div style={{marginTop: "5px", color: "#00A36C", textDecoration: "underline"}}>
              {Array.isArray(person.emails.email) ? person.emails.email[0].value : person.emails.email.value}
            </div>
            <div style={{marginTop: "5px"}}>{person.phone}</div>
            <div style={{marginTop: "5px"}}>{person.status}</div>
          </div>
          <div>
            <img
              src={person.images.image[0].url}
              style={{ margin: "0 5px", textAlign: "center", width: "140px" }}
            /> 
          </div>
          </div>}
          { person && <div style={{marginTop: "20px"}}><Grid
              data={orderBy(getEvents(person), sort)}
              style={{fontSize: '12px'}}
              sortable={true}
              sort={sort}
              onSortChange={(e) => {
                setSort(e.sort);
              }}
            >
            <GridColumn field="name" title="Company" />
            <GridColumn field="start" title="Start Date" />
          </Grid></div> }

      </Window>}
    </div>
  );
}

export default MyMap;