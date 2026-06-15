<?php

namespace App\Filament\Resources\Stays;

use App\Filament\Resources\Stays\Pages\CreateStay;
use App\Filament\Resources\Stays\Pages\EditStay;
use App\Filament\Resources\Stays\Pages\ListStays;
use App\Filament\Resources\Stays\Schemas\StayForm;
use App\Filament\Resources\Stays\Tables\StaysTable;
use App\Models\Stay;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class StayResource extends Resource
{
    protected static ?string $model = Stay::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    public static function form(Schema $schema): Schema
    {
        return StayForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return StaysTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListStays::route('/'),
            'create' => CreateStay::route('/create'),
            'edit' => EditStay::route('/{record}/edit'),
        ];
    }
}
