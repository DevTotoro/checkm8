-- DropForeignKey
ALTER TABLE "items" DROP CONSTRAINT "items_checklist_id_fkey";

-- DropForeignKey
ALTER TABLE "subitems" DROP CONSTRAINT "subitems_item_id_fkey";

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_checklist_id_fkey" FOREIGN KEY ("checklist_id") REFERENCES "checklists"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subitems" ADD CONSTRAINT "subitems_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE CASCADE ON UPDATE CASCADE;
