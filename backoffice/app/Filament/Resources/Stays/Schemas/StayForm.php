<?php

namespace App\Filament\Resources\Stays\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class StayForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Alojamento')
                    ->tabs([
                        Tab::make('Conteudo')
                            ->schema([
                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('name')
                                            ->label('Nome')
                                            ->required()
                                            ->live(onBlur: true)
                                            ->afterStateUpdated(fn ($state, callable $set) => $set('slug', Str::slug((string) $state))),
                                        TextInput::make('slug')
                                            ->required()
                                            ->unique(ignoreRecord: true),
                                        TextInput::make('region')
                                            ->label('Regiao')
                                            ->required(),
                                        TextInput::make('location')
                                            ->label('Localidade'),
                                        Select::make('stay_type')
                                            ->label('Tipo')
                                            ->options([
                                                'herdade' => 'Herdade',
                                                'boutique_hotel' => 'Boutique hotel',
                                                'quinta' => 'Quinta',
                                                'casa_de_campo' => 'Casa de campo',
                                                'turismo_rural' => 'Turismo rural',
                                                'hotel' => 'Hotel',
                                                'apartamento' => 'Apartamento',
                                            ])
                                            ->searchable(),
                                        Select::make('status')
                                            ->label('Estado')
                                            ->required()
                                            ->default('draft')
                                            ->options([
                                                'draft' => 'Rascunho',
                                                'review' => 'Para rever',
                                                'published' => 'Publicado',
                                                'archived' => 'Arquivado',
                                            ]),
                                    ]),
                                Textarea::make('excerpt')
                                    ->label('Resumo')
                                    ->rows(3)
                                    ->columnSpanFull(),
                                RichEditor::make('review_body')
                                    ->label('Review editorial')
                                    ->columnSpanFull(),
                            ]),
                        Tab::make('Detalhes')
                            ->schema([
                                Grid::make(2)
                                    ->schema([
                                        TextInput::make('ideal_for')
                                            ->label('Ideal para')
                                            ->placeholder('Casais, familias, descanso, design...'),
                                        TextInput::make('price_range')
                                            ->label('Preco indicativo')
                                            ->placeholder('€€ / desde 180€'),
                                    ]),
                                TagsInput::make('highlights')
                                    ->label('Destaques')
                                    ->placeholder('Piscina, vista, restaurante...'),
                                TagsInput::make('practical')
                                    ->label('Informacao pratica')
                                    ->placeholder('Pet-friendly, estacionamento, spa...'),
                            ]),
                        Tab::make('Links e SEO')
                            ->schema([
                                Section::make('Links')
                                    ->schema([
                                        TextInput::make('official_url')
                                            ->label('Site oficial')
                                            ->url(),
                                        TextInput::make('affiliate_url')
                                            ->label('Link afiliado principal')
                                            ->url(),
                                        TextInput::make('booking_url')
                                            ->label('Booking / parceiro')
                                            ->url(),
                                    ]),
                                Section::make('SEO')
                                    ->schema([
                                        TextInput::make('seo_title')
                                            ->label('Titulo SEO')
                                            ->maxLength(70),
                                        Textarea::make('seo_description')
                                            ->label('Descricao SEO')
                                            ->rows(3)
                                            ->maxLength(170),
                                        DateTimePicker::make('published_at')
                                            ->label('Publicado em'),
                                    ]),
                            ]),
                        Tab::make('Fotos')
                            ->schema([
                                Repeater::make('images')
                                    ->relationship()
                                    ->label('Galeria')
                                    ->schema([
                                        FileUpload::make('path')
                                            ->label('Imagem')
                                            ->disk('stays')
                                            ->directory('stays')
                                            ->image()
                                            ->imageEditor()
                                            ->required(),
                                        TextInput::make('alt_text')
                                            ->label('Texto alternativo'),
                                        TextInput::make('credit')
                                            ->label('Credito'),
                                        TextInput::make('sort_order')
                                            ->label('Ordem')
                                            ->numeric()
                                            ->default(0),
                                    ])
                                    ->reorderable()
                                    ->collapsible()
                                    ->columnSpanFull(),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
