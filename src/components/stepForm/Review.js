import React from "react";
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetail from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

export const Review = ({ formData }) => {
  const {
    fullName,
    email,
    phone,
    age,
    address,
    city,
    state,
    zip,
  } = formData;

  console.log(formData)

  return (
    <Container maxWidth='sm'>
      <h3>Review</h3>
      <RenderAccordion summary="Personal Data" details={[
        { 'Full Name': fullName },
        { 'Emai': email },
        { 'Phone Number': phone },
        { 'Age': age },
      ]} />
      <RenderAccordion summary="Location" details={[
        { 'Address': address },
        { 'City': city },
        { 'State': state },
        { 'Zip': zip },
      ]} />
      <RenderAccordion summary="File" details={[
        { 'Phone': phone },
        { 'Email': email },
      ]} />

    </Container>
  );
};

export const RenderAccordion = ({ summary, details, go }) => (
  <Accordion>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
    >{summary}</AccordionSummary>
    <AccordionDetail>
      <div>
        { details.map((data, index) => {
          const objKey = Object.keys(data)[0];
          const objValue = data[Object.keys(data)[0]];

          return <ListItemText key={index}>{`${objKey}: ${objValue}`}</ListItemText>

        }) }
      </div>
    </AccordionDetail>
  </Accordion>
)
