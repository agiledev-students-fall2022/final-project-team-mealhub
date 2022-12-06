import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button, Item } from "semantic-ui-react";
import "./card.css";
import Cardmodal from "./Mycardmodal";
import axios from "axios";
import dateFormat, { masks } from "dateformat";

function Card({ data, key }) {
  const [open, setOpen] = React.useState(false);
  const [joined, setJoined] = React.useState(data.joined);

  const truncateText = function (str1, leng) {
    if (str1.length > leng && str1.length > 0) {
      let new_str = str1 + " ";
      new_str = str1.substr(0, leng);
      new_str = str1.substr(0, new_str.lastIndexOf(" "));
      new_str = new_str.length > 0 ? new_str : str1.substr(0, leng);
      return new_str + "...";
    }
    return str1;
  };

  return (
    <div className="card-component">
      <Item.Group>
        <Item>
          <Item.Image
            size="small"
            src={data.image}
            onClick={() => {
              setOpen(true);
            }}
          />

          <Item.Content>
            <Item.Meta>
              <span>
                {dateFormat(data.date, "dddd, mmmm dS, yyyy, h:MM:ss TT")}
              </span>
            </Item.Meta>
            <Item.Header
              as="a"
              onClick={() => {
                setOpen(true);
              }}
            >
              {data.restaurant}
            </Item.Header>
            <Item.Description>{data.location}</Item.Description>

            <Item.Extra>
              <div> {truncateText(data.description, 320)}</div>
              <br></br>
              <Item.Meta>
                <span>
                  {data.members == null ? (data.members = []) : null}
                  {(data.capacity - data.members.length)
                    .toString()
                    .replace(/^[0]+/g, "0") + " spots left"}
                </span>
              </Item.Meta>
            </Item.Extra>

            {/* <Item.Meta>
              <span>
                {data.members == null ? (data.members = []) : null}
                {(data.capacity - data.members.length)
                  .toString()
                  .replace(/^[0]+/g, "0") + " spots left"}
              </span>
            </Item.Meta> */}

            <Item.Extra>
              <Button
                floated="right"
                color="red"
                onClick={() => {
                  setJoined(!joined);
                  axios
                    .delete(`${process.env.REACT_APP_URL}/myGroup/${data._id}`)
                    .then((response) => {
                      console.log(response.data);
                      setJoined(false);
                      // if axios delete is responds with sucess redirect mygroups page
                      window.location.href = "/myGroup";
                      // navigate("/myGroup");
                    });
                }}
              >
                {joined ? "Delete" : "Delete"}
              </Button>
            </Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>

      <Cardmodal // The invisible modal itself
        key={key}
        modalOpen={open}
        joined={joined}
        handleJoined={() => {
          setJoined(!joined);
        }}
        handleClose={() => {
          setOpen(false);
        }}
        data={data}
      />
    </div>
  );
}

export default Card;
