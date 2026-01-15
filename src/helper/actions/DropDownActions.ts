import { Locator } from '@playwright/test';
import { PageActions } from './PageActions';

export class DropDownActions {
    private actions: PageActions;
    private locator!: Locator;
    private description!: string;

    constructor(actions: PageActions) {
        this.actions = actions;
    }

    public setDropdown(selector: Locator, description: string): DropDownActions {
        this.locator = selector;
        this.description = description;
        return this;
    }

    public async selectByValue(value: string): Promise<void> {
        console.log(`Selecting value '${value}' in ${this.description}`);
        await this.locator.selectOption({ value });
    }

    public async selectByLabel(label: string): Promise<void> {
        console.log(`Selecting label '${label}' in ${this.description}`);
        await this.locator.selectOption({ label });
    }

    public async getSelectedValue() {
        console.log(`Getting selected value of ${this.description}`);
        return await this.locator.inputValue();
    }
}