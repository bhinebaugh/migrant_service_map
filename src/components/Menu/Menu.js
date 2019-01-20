import React, { Component } from "react";
import DropdownMenu from "./DropdownMenu";
import DropdownMenuItem from "./DropdownMenuItem";
import DistanceFilter from "./DistanceFilter";

export default class Menu extends Component {
  render() {
    const { providers, serviceTypes, newSymbolLayer } = this.props;

    const filteredProvidersList = type =>
      providers.filter(provider => provider.properties.type === type);

    return (
      <div className="side-menu">
        <DistanceFilter
          searchCenter={[-71.066954, 42.359947]}
          filterDistance={newSymbolLayer}
          providers={providers}
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
