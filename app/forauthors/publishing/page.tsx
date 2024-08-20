import React from "react";

const page = () => {
  return (
    <div className=" h-dvh py-8">
      <div>
        <h2>Reva Journals</h2>
        <button>Download Template</button>
        Reva Journals is a hybrid open access publication venue. Upon acceptance
        of an article for publication, authors will be provided with the
        opportunity to select their preferred publishing method:
      </div>
      <div>
        Regular Publishing Method: Articles are published and made accessible to
        subscribing institutions and individuals of Reva Journals.
        Non-subscribers may access specific articles by paying for access.
      </div>
      <div>
        Open Access: Upon acceptance, authors or their funding bodies will cover
        an Article Processing Fee (APF). Following payment, the final version of
        the published article becomes freely accessible to all readers.
      </div>
      <div className="container">
        <h1>APC Fees</h1>
        <div className="table-container">
          <table>
            <tbody>
              <tr>
                <th>Category</th>
                <th>Fee</th>
              </tr>
              <tr>
                <td>UG Students</td>
                <td>₹5000 INR</td>
              </tr>
              <tr>
                <td>PG Students</td>
                <td>₹7000 INR</td>
              </tr>
              <tr>
                <td>Research Scholar</td>
                <td>₹8000 INR</td>
              </tr>
            </tbody>
          </table>
          <table>
            <tbody>
              <tr>
                <th>Category</th>
                <th>Fee</th>
              </tr>
              <tr>
                <td>Foreign Authors</td>
                <td>$100 USD</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        Authors may be required to take specific measures to ensure compliance
        with open access mandates from funders and institutions. If your
        research is funded by an organization that mandates immediate open
        access, such as according to Plan S principles, it is advisable to
        choose the gold open access option. In such cases, we will guide you
        towards a compliant publishing method whenever feasible. For authors
        opting for the subscription-based publication method, it is necessary to
        adhere to the journals standard licensing terms, including policies
        related to self-archiving. These licensing terms take precedence over
        any other terms asserted by the author or any third party regarding any
        version of the manuscript.
      </div>
    </div>
  );
};

export default page;
