import React, { useContext } from 'react';
import { ListView } from "@progress/kendo-react-listview";
import { Pager } from "@progress/kendo-react-data-tools";
import { Avatar } from "@progress/kendo-react-layout";
import { DateTime } from "luxon";
import MLContext from './ML';
import LoadingPanel from './LoadingPanel';
import '@progress/kendo-theme-bootstrap/dist/all.css';

const MyListView = () => {

  const mlContext = useContext(MLContext);

  const formatDate = (iso) => {
    const parsed = Date.parse(iso);
    return parsed.toLocaleString('en-US',  {
      weekday: 'short', // long, short, narrow
      day: 'numeric', // numeric, 2-digit
      year: 'numeric', // numeric, 2-digit
      month: 'long', // numeric, 2-digit, long, short, narrow
      hour: 'numeric', // numeric, 2-digit
      minute: 'numeric', // numeric, 2-digit
      second: 'numeric', // numeric, 2-digit
  });
  }

  const MyItemRender = (props) => {
    let item = props.dataItem;
    return (
      <div
        className="k-listview-item row p-2 border-bottom align-middle"
        style={{
          margin: 0,
        }}
      >
        <div className="col-1">
          <Avatar type="image">
            <img
              src={Array.isArray(item.extracted.person.images.image) ? 
                item.extracted.person.images.image[0].url : 
                item.extracted.person.images.image.url}
              alt="ListView Avatar"
            />
          </Avatar>
        </div>
        <div className="col-3">
          <h2
            style={{
              fontSize: 14,
              color: "#454545",
              marginBottom: 0,
            }}
            className="text-uppercase"
          >
            {item.extracted.person.nameGroup.fullname.value}
          </h2>
          <div
            style={{
              fontSize: 12,
              color: "#a0a0a0",
            }}
          >
            {Array.isArray(item.extracted.person.emails.email) ? 
              item.extracted.person.emails.email[0].value : 
              item.extracted.person.emails.email.value}
          </div>
        </div>
        <div className="col-4">
          <div
            style={{
              fontSize: 14,
              color: "#454545",
              position: "relative",
              top: "8px"
            }}
          >
            {Array.isArray(item.extracted.person.addresses.address) ? 
              item.extracted.person.addresses.address[0].street : 
              item.extracted.person.addresses.address.street},&nbsp;
            {Array.isArray(item.extracted.person.addresses.address) ? 
              item.extracted.person.addresses.address[0].city : 
              item.extracted.person.addresses.address.city},&nbsp;
            {Array.isArray(item.extracted.person.addresses.address) ? 
              item.extracted.person.addresses.address[0].state : 
              item.extracted.person.addresses.address.state}&nbsp;
            {Array.isArray(item.extracted.person.addresses.address) ? 
              item.extracted.person.addresses.address[0].postal : 
              item.extracted.person.addresses.address.postal}
          </div>
        </div>
        <div className="col-2">
          <div
            style={{
              fontSize: 14,
              color: "#454545",
              position: "relative",
              top: "8px"
            }}
          >
            {DateTime.fromISO(item.extracted.person.createdOn.ts).toLocaleString(DateTime.DATETIME_FULL)}
          </div>
        </div>
        <div className="col-2">
          <div className="k-chip k-chip-md k-rounded-md k-chip-solid k-chip-solid-base">
            <div className="k-chip-content">
            {Array.isArray(item.extracted.person.relations.relation) ? 
                item.extracted.person.relations.relation.length : 
                '1'} connections</div>
          </div>
        </div>
      </div>
    );
  }

  const getPager = () => {
    return (
      <Pager
        skip={mlContext.start - 1}
        take={mlContext.pageLength}
        total={mlContext.total}
        buttonCount={5}
        info={true}
        type={"numeric"}
        previousNext={true}
        onPageChange={mlContext.handlePaging}
      />
    );
  }

  const getListView = () => {
    return (
      <div>
        {mlContext.total === 0 ? null : getPager()}
          <div style={{ minHeight: "518px" }}>
            {mlContext.loading ? <LoadingPanel /> : <ListView
              data={mlContext.results}
              item={MyItemRender}
              style={{ width: "100%" }}
            />}
          </div>
        {mlContext.total === 0 ? null : getPager()}
      </div>
    );
  }

  return (
    <div>
      {getListView()}
    </div>
  );
};

export default MyListView;