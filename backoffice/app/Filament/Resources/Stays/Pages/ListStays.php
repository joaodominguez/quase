<?php

namespace App\Filament\Resources\Stays\Pages;

use App\Filament\Resources\Stays\StayResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListStays extends ListRecords
{
    protected static string $resource = StayResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
