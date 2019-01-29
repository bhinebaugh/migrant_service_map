import React, { Component } from "react";
import DropdownMenu from "./DropdownMenu";
import DropdownMenuItem from "./DropdownMenuItem";
import FilterByAcceptingClients from "../FilterByAcceptingClients";

export default class Menu extends Component {
  render() {
    const { providers, serviceTypes, limitToAcceptingClients } = this.props;

    const filteredProvidersList = type => {
      // which property indicates whether a provider is accepting?
      // for now, simply returning providers with odd-numbered id's
      // to demonstrate that state and list update when checkbox is clicked
      return (limitToAcceptingClients === true)
        ? providers.filter(provider => (provider.properties.type === type) && (provider.id % 2) )
        : providers.filter(provider => provider.properties.type === type)
     }

    return (
      <div className="side-menu">
        <FilterByAcceptingClients
          shouldBeActive={limitToAcceptingClients}
          toggleAcceptingClients={this.props.toggleAcceptingClients}
        />
        <DropdownMenu text="Service Type" {...this.props}>
          {serviceTypes.map((serviceType, index) => (
            <DropdownMenu text={serviceType} key={index} {...this.props}>
              {filteredProvidersList(serviceType).map((provider, i) => (
                <DropdownMenuItem
                  key={i}
                  text={provider.properties.name}
                  item={provider}
                  clickHandler={this.props.handleMenuItemClick}
                />
              ))}
            </DropdownMenu>
          ))}
        </DropdownMenu>
        <DropdownMenu text="Other Criteria" {...this.props}>
          <DropdownMenuItem
            key={1}
            text={"placeholder"}
            items={["item1", "item2"]}
          />
        </DropdownMenu>
        <DropdownMenu text="Visa Status" {...this.props} />
      </div>
    );
  }
}
