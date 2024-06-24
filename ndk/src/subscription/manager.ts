import { NDKSubscription } from "./index.js";
import debug from "debug";

export type NDKSubscriptionId = string;

export class NDKSubscriptionManager {
    public subscriptions: Map<NDKSubscriptionId, NDKSubscription>;
    private debug: debug.Debugger;

    constructor(debug: debug.Debugger) {
        this.subscriptions = new Map();
        this.debug = debug.extend("sub-manager");
    }

    public add(sub: NDKSubscription) {
        this.subscriptions.set(sub.internalId, sub);

        sub.on("close", () => {
            this.subscriptions.delete(sub.internalId);
        });
    }
}
