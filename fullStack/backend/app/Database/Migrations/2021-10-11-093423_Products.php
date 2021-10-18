<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Products extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'=>[
              'type'=>'INT',
              'constraint'=>5,
              'auto_increment'=>true
            ],
            'title'=>[
                'type'=>'VARCHAR',
                'constraint'=>15,
            ],
                'price'=>[
                    'type'=>'INT',
                    'constraint'=>15,
                    ]
        ]);
        $this->forge->addkey( 'id',true);
        $this->forge->createTable('products');

    }

    public function down()
    {
        //
    }
}