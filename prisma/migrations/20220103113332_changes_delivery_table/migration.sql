-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_delivery" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "idClient" TEXT NOT NULL,
    "idDeliveryman" TEXT,
    "itemName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveredAt" DATETIME,
    CONSTRAINT "delivery_idClient_fkey" FOREIGN KEY ("idClient") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "delivery_idDeliveryman_fkey" FOREIGN KEY ("idDeliveryman") REFERENCES "deliveryman" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_delivery" ("createdAt", "deliveredAt", "id", "idClient", "idDeliveryman", "itemName") SELECT "createdAt", "deliveredAt", "id", "idClient", "idDeliveryman", "itemName" FROM "delivery";
DROP TABLE "delivery";
ALTER TABLE "new_delivery" RENAME TO "delivery";
CREATE UNIQUE INDEX "delivery_idClient_key" ON "delivery"("idClient");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
