<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class Registration extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'id'=>[
              'type'=>'INT',
              'constraint'=>5,
              'auto_increment'=>true
            ],
            'name'=>[
                'type'=>'VARCHAR',
                'constraint'=>50,
            ],
            'email'=>[
                 'type'=>'VARCHAR',
                 'constraint'=>40,
            ],
            'address'=>[
            'type'=>'VARCHAR',
            'constraint'=>120,
           ],
           'image'=>[
            'type'=>'VARCHAR',
            'constraint'=>100,
       ],
       'country'=>[
        'type'=>'VARCHAR',
        'constraint'=>100,
   ],
   'state'=>[
    'type'=>'VARCHAR',
    'constraint'=>100,
],
'city'=>[
    'type'=>'VARCHAR',
    'constraint'=>100,
],
        ]);
        $this->forge->addkey( 'id',true);
        $this->forge->createTable('registrations');

    }

    public function down()
    {
        //
    }
}