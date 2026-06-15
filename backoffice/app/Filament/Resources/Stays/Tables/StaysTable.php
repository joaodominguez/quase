<?php

namespace App\Filament\Resources\Stays\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class StaysTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nome')
                    ->description(fn ($record) => $record->slug)
                    ->searchable()
                    ->sortable(),
                TextColumn::make('region')
                    ->label('Regiao')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('stay_type')
                    ->label('Tipo')
                    ->badge(),
                TextColumn::make('status')
                    ->label('Estado')
                    ->badge()
                    ->colors([
                        'gray' => 'draft',
                        'warning' => 'review',
                        'success' => 'published',
                        'danger' => 'archived',
                    ])
                    ->sortable(),
                TextColumn::make('updated_at')
                    ->label('Actualizado')
                    ->dateTime('d/m/Y H:i')
                    ->sortable(),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('Estado')
                    ->options([
                        'draft' => 'Rascunho',
                        'review' => 'Para rever',
                        'published' => 'Publicado',
                        'archived' => 'Arquivado',
                    ]),
                SelectFilter::make('region')
                    ->label('Regiao')
                    ->options(fn () => \App\Models\Stay::query()
                        ->select('region')
                        ->distinct()
                        ->orderBy('region')
                        ->pluck('region', 'region')
                        ->all()),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
