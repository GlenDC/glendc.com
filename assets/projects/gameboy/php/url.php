<?php
class URL { 
    public $name = 'name'; 
    public $website = 'website';
	
	public function getInfo() {
		echo '<a href="' . $this->website . '">' . $this->name . '</a>';
	}
}
?>
