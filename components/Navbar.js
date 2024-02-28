import React, { Component } from 'react'
import { MenuItem, Menu, MenuMenu, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default class MenuExampleVerticalSecondary extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
        <div>
        <Menu pointing>
          <MenuItem
            name='Cases'
            active={activeItem === 'cases'}
            onClick={this.handleItemClick}
            link href="/"
          />
          <MenuItem
            name='Create Case'
            active={activeItem === 'create case'}
            onClick={this.handleItemClick}
            link href="/createcase"
          />
          <MenuItem
            name='friends'
            active={activeItem === 'friends'}
            onClick={this.handleItemClick}
          />
          <MenuMenu position='right'>
            <MenuItem>
              <Input icon='search' placeholder='Search...' />
            </MenuItem>
          </MenuMenu>
        </Menu>
      </div>
    )
  }
}