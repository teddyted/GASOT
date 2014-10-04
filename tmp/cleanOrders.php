<?php
$mageFilename = 'app/Mage.php';

require_once $mageFilename;

Varien_Profiler::enable();

//Mage::setIsDeveloperMode(true);

ini_set('display_errors', 1);

umask(0);
Mage::app('default');
Mage::register('isSecureArea', 1);
//until here you gained access to the Magento models. The rest is custom code
$orders_object = Mage::getModel('sales/order')->getCollection()->addAttributeToFilter('increment_id', 100000025);

$orders_arr = $orders_object->getData();
if(!empty($orders_arr)){
$orders_data = $orders_arr[0];

var_dump($orders_data);exit;

$orderId = $orders_data['entity_id'];//put here the id of the order you want to delete. THE ONE FROM THE DATABASE NOT THE INCREMENT_ID

$order = Mage::getModel('sales/order')->load($orderId);

$invoices = $order->getInvoiceCollection();
foreach ($invoices as $invoice){
$invoice->delete();
}
$creditnotes = $order->getCreditmemosCollection();
foreach ($creditnotes as $creditnote){
$creditnote->delete();
}
$shipments = $order->getShipmentsCollection();
foreach ($shipments as $shipment){
$shipment->delete();
}
$order->delete();

     $db = Mage::getSingleton('core/resource')->getConnection('core_write');    
     $sales_flat_order_grid= Mage::getSingleton('core/resource')->getTableName('sales_flat_order_grid');
     $order_increment_id = $order->getIncrementId();
      if($order_increment_id){ 
           $db->query("DELETE FROM ".$sales_flat_order_grid." WHERE increment_id='".mysql_escape_string($order_increment_id)."'");        
      }

echo "deleted";
}else{
echo "no record";
}



//Mage::getModel('sales/order')->load($orderId)->delete();

?>
