import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ItemHelper } from "@spt-aki/helpers/ItemHelper";
import { BaseClasses } from "@spt-aki/models/enums/BaseClasses";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";

class BetterKeys implements IPostDBLoadMod {
    private logger: ILogger;
    readonly modName = "BetterKeys";

    public postDBLoad(container: DependencyContainer): void {
        this.logger = container.resolve<ILogger>("WinstonLogger");
        // get database from server
        const database = container.resolve<DatabaseServer>("DatabaseServer").getTables();
        // Get ItemHelper ready to use
        const itemHelper: ItemHelper = container.resolve<ItemHelper>("ItemHelper");
        const items = Object.values(database.templates.items);
        const keysObject = items.filter(x => x._type === "Item" && itemHelper.isOfBaseclass(x._id, BaseClasses.KEY));
        // const keycardObject = items.filter(x => x._type === "Item" && itemHelper.isOfBaseclass(x._id, BaseClasses.KEY));
        
        const markedKeys = [ // Make background color YELLOW
            "5780cf7f2459777de4559322", "5d80c62a86f7744036212b3f", "5d80c60f86f77440373c4ece", "62987dfc402c7f69bf010923",
            "64ccc25f95763a1ae376e447", "63a3a93f8a56922e82001f5d", "64d4b23dc1b37504b41ac2b6"
        ];

        const valuableKeys = [ // Make background color VIOLET
            "5448ba0b4bdc2d02308b456c", "5780d0532459777a5108b9a2", "5913877a86f774432f15d444", "5780d0652459777df90dcb74", "591383f186f7744a4c5edcf3", 
            "591382d986f774465a6413a7", "59136e1e86f774432f15d133", "59387a4986f77401cc236e62", "5672c92d4bdc2d180f8b4567", "59148c8a86f774197930e983", 
            "5780cf942459777df90dcb72", "5780cfa52459777dfb276eb1", "5ad5d64486f774079b080af8", "5e42c71586f7747f245e1343", "5ad5cfbd86f7742c825d6104", 
            "5addaffe86f77470b455f900", "5ad5d7d286f77450166e0a89", "5e42c81886f7742a01529f57", "5e42c83786f7742a021fdf3c", "5ad5db3786f7743568421cce", 
            "5c1d0f4986f7744bb01837fa", "5c1d0efb86f7744baf2e7b7b", "5c1d0c5f86f7744bb2683cf0", "5c1d0dc586f7744baf2e7b79", "5c1e495a86f7743109743dfb", 
            "5c1d0d6d86f7744bb2683e1f", "5c1e2a1e86f77431ea0ea84c", "5c1e2d1f86f77431e9280bee", "5c1f79a086f7746ed066fb8f", "5d947d4e86f774447b415895", 
            "5d947d3886f774447b415893", "5d8e0e0e86f774321140eb56", "5d80cb3886f77440556dbf09", "5d95d6fa86f77424484aa5e9", "5d80cb5686f77440545d1286", 
            "5d95d6be86f77424444eb3a7", "5d80c6c586f77440351beef1", "5d80ccac86f77470841ff452", "5d80ccdd86f77474f7575e02", "5d80cd1a86f77402aa362f42", 
            "5d80c66d86f774405611c7d6", "5d80c6fc86f774403a401e3c", "5d80c88d86f77440556dbf07", "61aa5b7db225ac1ead7957c1", "61aa5ba8018e9821b7368da9", 
            "61aa5b518f5e7a39b41416e2", "61a6444b8c141d68246e2d2f", "62987da96188c076bc0d8c51", "62987c658081af308d7558c6", "5a0f08bc86f77478f33b84c2", 
            "5d8e15b686f774445103b190", "5a0eb6ac86f7743124037a28", "5a0f068686f7745b0d4ea242", "5a0f0f5886f7741c4e32a472", "5a0dc45586f7742f6b0b73e3", 
            "5a0dc95c86f77452440fc675", "5a144dfd86f77445cb5a0982", "5a0ec6d286f7742c0b518fb5", "5a0ee30786f774023b6ee08f", "5a0ee34586f774023b6ee092", 
            "5a13eebd86f7746fd639aa93", "5a0ee37f86f774023657a86f", "5a1452ee86f7746f33111763", "5a13ef7e86f7741290491063", "5a13f46386f7741dd7384b04", 
            "5a0eff2986f7741fd654e684", "5a0ea64786f7741707720468", "5eff09cd30a7dc22fd1ddfed", "5a144bdb86f7741d374bbde0", "5a0ee4b586f7743698200d22", 
            "5a13f24186f77410e57c5626", "5a13f35286f77413ef1436b0", "5a145d4786f7744cbb6f4a12", "5a145d7b86f7744cbb6f4a13", "5a0eec9686f77402ac5c39f2", 
            "5a0eee1486f77402aa773226", "5a0ea79b86f7741d4a35298e", "63a39c7964283b5e9c56b280", "64ccc1ec1779ad6ba200a137", "63a71e781031ac76fe773c7d", 
            "64ccc1d4a0f13c24561edf27", "64ccc1f4ff54fb38131acf27", "63a71e922b25f7513905ca20", "63a71e86b7f4570d3a293169", "63a39fc0af870e651d58e6ae", 
            "63a39fd1c9b3aa4b61683efb", "63a39f6e64283b5e9c56b289", "63a39667c9b3aa4b61683e98", "63a71ed21031ac76fe773c7f", "64ccc246ff54fb38131acf29", 
            "6582dbe43a2e5248357dbe9a", "6582dc4b6ba9e979af6b79f4", "6582dbf0b8d7830efc45016f", "6582dc5740562727a654ebb1", "64ccc24de61ea448b507d34d", 
            "64ccc206793ca11c8f450a38", "64ccc1fe088064307e14a6f7", "63a39f08cd6db0635c197600", "63a399193901f439517cafb6", "63a397d3af870e651d58e65b",
            "64ccc2111779ad6ba200a139", "5c94bbff86f7747ee735c08f", "591afe0186f77431bd616a11"
        ];

        // Find the "key/keycard" item by its Id
        keysObject.sort((a, b) => a._name.localeCompare(b._name)); // DEBUG STATEMENT - Sort by name alphabetically
        keysObject.forEach((key) => {
            // databaseServer.getTables().templates.items[keyBlacklist[key]]._props.BackgroundColor = "red";
            key._props.BackgroundColor = "grey"

            if (markedKeys.includes(key._id)) {
                key._props.BackgroundColor = "yellow"
            } 
            
            if (valuableKeys.includes(key._id)) {
                key._props.BackgroundColor = "violet"
            }
            
            // this.logger.logWithColor(`[${this.modName}]: :::KEY NAMES::: ${key._name} - has a background color of ${key._props.BackgroundColor}.`, LogTextColor.GRAY)
        });
        this.logger.success(`[${this.modName}]: Marked and Valuable Key background colors changed!\n`)        
    }
}

module.exports = { mod: new BetterKeys() }