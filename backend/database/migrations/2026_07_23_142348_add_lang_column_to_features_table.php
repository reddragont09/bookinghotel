<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLangColumnToFeaturesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('features', function (Blueprint $table) {
            $table->longText('description_cn')->nullable();
            $table->longText('description_ko')->nullable();
            $table->double('price_cn')->nullable();
            $table->double('price_ko')->nullable();
        });
        Schema::table('features', function (Blueprint $table) {
            $table->dropColumn('description_cn');
            $table->dropColumn('description_ko');
            $table->dropColumn('price_cn');
            $table->dropColumn('price_ko');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('bookings', function (Blueprint $table) {
        });
    }
}
