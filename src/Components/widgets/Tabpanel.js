import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Accordion() {
  return (
    <Tabs

      defaultActiveKey="description"
      id="fill-tab"
      className="mb-3 tabpanel"
      
    >
     
     <Tab className='tab-header' eventKey="description" title="Description">
        <h1> hi one </h1>
      </Tab>
      <Tab className='tab-header' eventKey="Rule book" title="Rule Book">
        <h1> hi two </h1>
      </Tab>
      
    </Tabs>
  );
}

export default Accordion;