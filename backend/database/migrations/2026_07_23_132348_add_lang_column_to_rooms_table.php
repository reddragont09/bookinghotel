<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLangColumnToRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('rooms', function (Blueprint $table) {
            $table->longText('description_vi')->nullable();
            $table->longText('description_zh')->nullable();
            $table->longText('description_ko')->nullable();
            $table->double('price_vi')->nullable();
            $table->double('price_zh')->nullable();
            $table->double('price_ko')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('rooms', function (Blueprint $table) {
            $table->dropColumn('description_vi');
            $table->dropColumn('description_zh');
            $table->dropColumn('description_ko');
            $table->dropColumn('price_vi');
            $table->dropColumn('price_zh');
            $table->dropColumn('price_ko');
        });
    }
}
