import { CheckBoxActions } from './CheckBoxActions';
import { DropDownActions } from './DropDownActions';
import { EditBoxActions } from './EditBoxActions';
import { UIElementActions } from './UIElementActions';
import { PageActions } from './PageActions';
import { Locator } from '@playwright/test';

export class UIActions {
 private elementAction: UIElementActions;
  private editBoxAction: EditBoxActions;
  private checkboxAction: CheckBoxActions;
  private dropdownAction: DropDownActions;
  private pageActions: PageActions;

  constructor() {
    this.pageActions = new PageActions();
    this.elementAction = new UIElementActions(this.pageActions);
    this.editBoxAction = new EditBoxActions(this.pageActions);
    this.checkboxAction = new CheckBoxActions();
    this.dropdownAction = new DropDownActions(this.pageActions);
  }

  public checkbox(selector: string | Locator, description: string) {
    return this.checkboxAction.setCheckbox(
      this.elementAction.setElement(selector, description).getLocator(),
      description
    );
  }

  public dropdown(selector: string | Locator, description: string) {
    return this.dropdownAction.setDropdown(
      this.elementAction.setElement(selector, description).getLocator(),
      description
    );
  }

  public editBox(selector: string | Locator, description: string) {
    return this.editBoxAction.setEditBox(selector, description);
  }

  public element(selector: string | Locator, description: string) {
    return this.elementAction.setElement(selector, description).getLocator();
  }

  public page() {
    return this.pageActions;
  }
}